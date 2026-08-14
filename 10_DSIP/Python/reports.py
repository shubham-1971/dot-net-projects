import requests
import csv
import sys
from datetime import datetime
 
# API BASE URL
BASE_URL = "http://localhost:5022/api/Shipments"
 
 
# GET DATA FROM API
def get_api_data():
    try:
        shipments = requests.get(BASE_URL)
        shipments.raise_for_status()
 
        return shipments.json()
 
    except requests.exceptions.RequestException:
        print("ERROR: DSIP API is offline.")
        sys.exit(1)
 
 
# FILTER TODAY'S SHIPMENTS
def filter_today_shipments(shipments):
    today = datetime.now().date()
 
    today_shipments = []
 
    for s in shipments:
        try:
            # Handles both normal ISO format and UTC format ending with 'Z'
            booked_date = datetime.fromisoformat(
                s["bookedAt"].replace("Z", "+00:00")
            ).date()
 
            if booked_date == today:
                today_shipments.append(s)
 
        except Exception:
            pass
 
    return today_shipments
 
 
# GENERATE STATS
def generate_stats(shipments):
    return {
        "booked": sum(1 for s in shipments if s["status"] == "Booked"),
        "inTransit": sum(1 for s in shipments if s["status"] == "In Transit"),
        "outForDelivery": sum(1 for s in shipments if s["status"] == "Out for Delivery"),
        "delivered": sum(1 for s in shipments if s["status"] == "Delivered"),
        "rto": sum(1 for s in shipments if s["status"] == "RTO")
    }
 
 
# REPORT
def print_report(shipments, stats):
    total = len(shipments)
 
    if total > 0:
        avg_weight = sum(s["weightKg"] for s in shipments) / total
        heaviest = max(shipments, key=lambda x: x["weightKg"])
        heaviest_awb = heaviest["awbNumber"]
        heaviest_weight = heaviest["weightKg"]
    else:
        avg_weight = 0
        heaviest_awb = "-"
        heaviest_weight = 0
 
    print("=" * 48)
    print(" DELHIVERY - END OF DAY SHIPMENT REPORT")
    print(" Date            :", datetime.now().strftime("%Y-%m-%d"))
    print("=" * 48)
 
    print(f" Total Shipments : {total}")
    print(f" Booked          : {stats['booked']}")
    print(f" In Transit      : {stats['inTransit']}")
    print(f" Out for Delivery: {stats['outForDelivery']}")
    print(f" Delivered       : {stats['delivered']}")
    print(f" RTO             : {stats['rto']}")
 
    print("-" * 48)
    print(f" Avg Weight      : {avg_weight:.2f} kg")
    print(f" Heaviest        : {heaviest_awb} ({heaviest_weight} kg)")
    print("=" * 48)
 
 
# EXPORT CSV
def export_csv(shipments):
    filename = "delhivery_report_" + datetime.now().strftime("%Y%m%d") + ".csv"
 
    with open(filename, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
 
        writer.writerow([
            "ShipmentId",
            "AWB",
            "Sender",
            "Receiver",
            "Origin",
            "Destination",
            "Weight",
            "Status",
            "BookedAt"
        ])
 
        for s in shipments:
            writer.writerow([
                s["shipmentId"],
                s["awbNumber"],
                s["senderName"],
                s["receiverName"],
                s["origin"],
                s["destination"],
                s["weightKg"],
                s["status"],
                s["bookedAt"]
            ])
 
    print(f"\nCSV exported successfully -> {filename}")
 
 
# MAIN
if __name__ == "__main__":
 
    # Get all shipments
    shipments = get_api_data()
 
    # Filter only today's shipments
    today_shipments = filter_today_shipments(shipments)
 
    # Generate today's stats
    stats = generate_stats(today_shipments)
 
    # Print today's report
    print_report(today_shipments, stats)
 
    # Export today's shipments if requested
    if "--export" in sys.argv:
        export_csv(today_shipments)  