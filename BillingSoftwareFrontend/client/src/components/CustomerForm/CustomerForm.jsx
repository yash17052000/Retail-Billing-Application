import React from 'react'

function CustomerForm({
  setCustomerDetails,
  customerDetails
}) {
  return (
    <div className="p-4" >
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerName" className="col-4">Customer name</label>
          <input type="text" className="form-control form-control-sm" value={customerDetails.customerName}

            onChange={(e) => setCustomerDetails(
              {
                ...customerDetails,
                customerName: e.target.value
              }
            )}
          />
        </div>
      </div>

      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="mobileNumber" className="col-4">Mobile number</label>
          <input type="number" className="form-control form-control-sm" value={customerDetails.mobileNumber}
            onChange={(e) => setCustomerDetails(
              {
                ...customerDetails,
                mobileNumber: e.target.value
              }
            )}

          />
        </div>
      </div>
    </div>
  )
}

export default CustomerForm
