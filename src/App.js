import { useState } from 'react';
import './App.css';
function App() {

  const [selectedList, setSelectedList] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState();

  const services_list = [
    { id: "#1", displayName: "ENGINE OIL", price: 1050, disabled: false },
    { id: "#2", displayName: "OIL FILTER", price: 80, disabled: false },
    { id: "#3", displayName: "PACKING PASTE", price: 90, disabled: false },
    { id: "#4", displayName: "SILENCER GASKET", price: 45, disabled: false },
    { id: "#5", displayName: "AIR FILTER", price: 220, disabled: false },
    { id: "#6", displayName: "REAR DISK PAD", price: 250, disabled: false },
    { id: "#7", displayName: "REAR DISK O-RING", price: 320, disabled: false },
    { id: "#8", displayName: "REAR DISK PISOTN", price: 300, disabled: false },
    { id: "#9", displayName: "DISK OIL", price: 150, disabled: false },
    { id: "#10", displayName: "REAR WHEEL LATCH RUBBER", price: 160, disabled: false },
    { id: "#11", displayName: "CLUTCH CABLE", price: 140, disabled: false },
    { id: "#12", displayName: "ACCELARATOR CABLE", price: 300, disabled: false },
    { id: "#13", displayName: "CREAM WAXING", price: 850, disabled: false },
    { id: "#14", displayName: "WATER WASH", price: 170, disabled: false },
    { id: "#15", displayName: "LABOUR", price: 950, disabled: false },
  ];
  const todaysDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
  let message =
    `Date: ${todaysDate}
Vehicle Number: ${vehicleNumber}
Customer Name: ${firstName}                       
------------------------------
  `;
  const showWhatsAppButton = selectedList.length > 0 && firstName !== '' && vehicleNumber !== '' && customerPhoneNumber;
  return (
    <div className="App">
      <div className='leftMenu'>
        {
          services_list?.map(x => {
            return (
              <>
                <button
                  className='servicesList'
                  onClick={
                    () => {
                      if (!selectedList.filter((service) => service.id === x.id).length > 0) {
                        setSelectedList([...selectedList, x]);
                        setTotalCost(totalCost + x.price);
                      }
                    }}
                >
                  {x.displayName}
                </button>
                <br />
              </>
            );
          })
        }
      </div>
      <div className='rightMenu'>
        <fieldset>
          <label>
            <u>Date</u>:   {todaysDate} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <u>Vehicle Number</u>:    {vehicleNumber}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <u>Bill Number</u>:    N/A
          </label>
          <br />
          <form action="#" method="get">
            <label for="firstname">
              First Name*
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={firstName}
              onChange={(e) =>
                setFirstName(e.target.value)
              }
              placeholder="Enter customer name"
              required
            />
            <label for="vehicleNumber">Vehicle Number*</label>
            <input
              type="text"
              name="vehicleNumber"
              id="vehicleNumber"
              value={vehicleNumber}
              onChange={(e) =>
                setVehicleNumber(e.target.value)
              }
              placeholder="Enter vehicle number"
              required
            />
            <label for="phoneNumber">Phone Number*</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              pattern="[1-9]{1}[0-9]{9}"
              value={customerPhoneNumber}
              onChange={(e) =>
                setCustomerPhoneNumber(e.target.value)
              }
              placeholder="Enter 10 digit whatsapp number"
              required
              maxLength="10" 
              />

            <br />
            {
              selectedList?.map(x => {
                return (
                  <>
                    <div className='serviceContents'>
                      <div className='col-1'><label>{x.displayName}</label></div> &nbsp;
                      <div className='col-2'><label>{x.price}</label></div> &nbsp;&nbsp;
                      <div className='col-3 removeIcon' onClick={() => {
                        setSelectedList(selectedList?.filter(y => y.id !== x.id));
                        setTotalCost(totalCost - x.price);
                      }}>
                        Delete
                      </div>
                      &nbsp;
                      <br />
                    </div>
                  </>
                );
              })
            }
            <br />
            {selectedList.length > 0 && (
              <>
                <div className='totalAmount'>
                  <h2>{totalCost}/-</h2>
                </div>
                <br />
                <button
                  disabled={!showWhatsAppButton}
                  onClick={() => {
                    const phoneNumber = "+91" + customerPhoneNumber;

                    selectedList.map((x, i) => {
                      message += `
${i + 1}. ${x.displayName} - ${x.price}
`
                    })
                    message +=
                      `
------------------------------
TOTAL AMOUNT: ${totalCost}.00/-

`;
                    console.log(message);
                    const encodedMessage = encodeURIComponent(message);
                    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

                    window.open(whatsappURL, "_blank");
                  }}>
                  &#128231; Send on WhatsApp
                </button>
              </>
            )}
          </form>
        </fieldset>
        <br />

      </div>

    </div>
  );
}

export default App;
