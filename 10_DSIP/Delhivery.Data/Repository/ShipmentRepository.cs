using Delhivery.Data.Exceptions;
using Delhivery.Data.Models;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Delhivery.Data.Repository
{
    public class ShipmentRepository : IShipmentRepository
    {
        private readonly string _connectionString;

        public ShipmentRepository(string connectionString)
        {
            this._connectionString = connectionString;
        }

        private static Shipment MapShipment(SqlDataReader reader)
        {
            return new Shipment
            {
                ShipmentId = Convert.ToInt32(reader["ShipmentId"]),
                AWBNumber = reader["AWBNumber"].ToString()!,
                SenderName = reader["SenderName"].ToString()!,
                ReceiverName = reader["ReceiverName"].ToString()!,
                Origin = reader["Origin"].ToString()!,
                Destination = reader["Destination"].ToString()!,
                WeightKg = Convert.ToDecimal(reader["WeightKg"]),
                Status = reader["Status"].ToString()!,
                BookedAt = Convert.ToDateTime(reader["BookedAt"]),

                DeliveredAt =
                    reader["DeliveredAt"] == DBNull.Value
                        ? null
                        : Convert.ToDateTime(reader["DeliveredAt"])
            };
        }

        public async Task<List<Shipment>> GetAllAsync()
        {
            List<Shipment> shipments = new();

            using SqlConnection connection = new(_connectionString);

            using SqlCommand command = new("usp_GetAllShipments", connection);

            command.CommandType = CommandType.StoredProcedure;

            await connection.OpenAsync();

            using SqlDataReader reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                shipments.Add(MapShipment(reader));
            }

            return shipments;
        }


        public async Task<Shipment> GetByAWBAsync(string awb)
        {
            using SqlConnection connection = new(_connectionString);

            using SqlCommand command =
                new("usp_GetShipmentByAWB", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add(
                "@AWBNumber",
                SqlDbType.NVarChar,
                20).Value = awb;

            await connection.OpenAsync();

            using SqlDataReader reader =
                await command.ExecuteReaderAsync();

            if (!await reader.ReadAsync())
            {
                throw new ShipmentNotFoundException(
                    $"Shipment with AWB '{awb}' was not found.");
            }

            return MapShipment(reader);
        }

        public async Task BookAsync(Shipment shipment)
        {
            const string sql = @"
        INSERT INTO Shipments
        (
            AWBNumber,
            SenderName,
            ReceiverName,
            Origin,
            Destination,
            WeightKg
        )
        VALUES
        (
            @AWBNumber,
            @SenderName,
            @ReceiverName,
            @Origin,
            @Destination,
            @WeightKg
        );";

            using SqlConnection connection = new(_connectionString);

            using SqlCommand command = new(sql, connection);

            command.Parameters.Add("@AWBNumber", SqlDbType.NVarChar, 20).Value = shipment.AWBNumber;
            command.Parameters.Add("@SenderName", SqlDbType.NVarChar, 100).Value = shipment.SenderName;
            command.Parameters.Add("@ReceiverName", SqlDbType.NVarChar, 100).Value = shipment.ReceiverName;
            command.Parameters.Add("@Origin", SqlDbType.NVarChar, 100).Value = shipment.Origin;
            command.Parameters.Add("@Destination", SqlDbType.NVarChar, 100).Value = shipment.Destination;
            command.Parameters.Add("@WeightKg", SqlDbType.Decimal).Value = shipment.WeightKg;

            await connection.OpenAsync();

            await command.ExecuteNonQueryAsync();
        }


        public async Task UpdateStatusAsync(string awb, string status)
        {
            using SqlConnection connection = new(_connectionString);

            using SqlCommand command =
                new("usp_UpdateShipmentStatus", connection);

            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.Add("@AWBNumber", SqlDbType.NVarChar, 20).Value = awb;

            command.Parameters.Add("@NewStatus", SqlDbType.NVarChar, 30).Value = status;

            await connection.OpenAsync();

            int rows = await command.ExecuteNonQueryAsync();

            if (rows == 0)
            {
                throw new ShipmentNotFoundException(
                    $"Shipment with AWB '{awb}' was not found.");
            }
        }

        public async Task CancelAsync(int shipmentId)
        {
            const string sql =
                @"DELETE FROM Shipments
          WHERE ShipmentId=@ShipmentId";

            using SqlConnection connection = new(_connectionString);

            using SqlCommand command =
                new(sql, connection);

            command.Parameters.Add("@ShipmentId",
                                    SqlDbType.Int).Value = shipmentId;

            await connection.OpenAsync();

            int rows =
                await command.ExecuteNonQueryAsync();

            if (rows == 0)
            {
                throw new ShipmentNotFoundException(
                    $"Shipment with Id {shipmentId} was not found.");
            }
        }

    }
}
