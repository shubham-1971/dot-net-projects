# COPILOT USAGE LOG

## Entry 1
### Task
Creating Shipment Statistics Dashboard Cards

### Copilot Suggestion
Generated HTML/CSS card components for Total Shipments, Booked, In Transit, Out for Delivery, Delivered and RTO cards.

### Decision
ACCEPTED

### Reason
The generated card structure was clean, responsive and reduced UI development time.

---

## Entry 2
### Task
Implementing Shipment Status Update API

### Copilot Suggestion
Generated API logic to update shipment status directly.

### Decision
MODIFIED

### Reason
I modified the logic to automatically set DeliveredAt = GETDATE() when status becomes Delivered because the generated solution missed this business requirement.

---

## Entry 3
### Task
Building Shipment Booking Form

### Copilot Suggestion
Generated Bootstrap form containing AWB Number, Weight, Sender Name, Receiver Name, Origin and Destination fields.

### Decision
MODIFIED

### Reason
I added validations for AWB Number, WeightKg > 0, Sender Name and Receiver Name to satisfy project requirements.

---

## Entry 4
### Task
Implementing AJAX Integration with Backend APIs

### Copilot Suggestion
Suggested Fetch API examples for CRUD operations.

### Decision
REJECTED

### Reason
The project required jQuery AJAX. Therefore I rejected the Fetch API implementation and used $.ajax().

---

## Entry 5
### Task
Creating Shipment Statistics Endpoint

### Copilot Suggestion
Returned a raw shipment list.

### Decision
MODIFIED

### Reason
I changed the implementation to return aggregated counts by shipment status for dashboard reporting.
