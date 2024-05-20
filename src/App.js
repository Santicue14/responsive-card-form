import React, { useState } from 'react'
import bgMobile from './images/bg-main-mobile.png'
import bgDesktop from './images/bg-main-desktop.png'
import logo from './images/card-logo.svg'
import check from './images/icon-complete.svg'
import { format } from "date-fns"

export default function App() {

  const [confirmed, setConfirmed] = useState(false)
  const [name, setName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [date, setDate] = useState("01-01")
  const [cvc, setCvc] = useState("")

  const handleSubmit = async(e)=> {
    e.preventDefault()
    const cardData = {name,cardNumber,date,cvc}
    try{
      const response = await fetch('http://localhost:4000/card',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
      })
      if (response.ok){
        setConfirmed(true)
        setCardNumber("")
        setName("")
        setCvc("")
        setDate("01-01")
      }else{
        console.log('Error sending data')
      }
    }catch (error){
      setConfirmed(true)
      console.log(error)
    }
  }
  return (
    <>
      <section>
        <div className='absolute -z-10 w-full'>
          <picture>
            <source media='(min-width: 1025px)' srcSet={bgDesktop} />
            <img src={bgMobile} alt='Mobile desktop' className='w-full md:w-1/3 h-full'/>
          </picture>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto'>
          <div className='mt-10 mx-5 grid grid-cols-1'>
            <article className='front-card p-5 flex flex-col justify-between'>
              <img src={logo} alt="Logo of card" className='w-20 lg:w-28' />

              <div>
                <h2 className='text-White text-xl  lg:text-3xl mb-6 tracking-widest'>{cardNumber}</h2>
                <ul className='flex items-center justify-between'>
                  <li className='text-White uppercase text-base lg:text-xl tracking-widest'>{name}</li>
                  <li className='text-White text-base lg:text-xl tracking-widest'>{format(new Date(date),"MM/yy" )}</li>
                </ul>
              </div>
            </article>
            <article className='back-card relative lg:ml-20'>
              <p className='absolute right-10 text-lg lg:text-xl text-White tracking-widest'>{cvc}</p>
            </article>
          </div>
          <div className='pt-8 px-5 pb-20'>
            {!confirmed &&
              <form className='flex flex-col justify-center gap-8 max-w-lg lg:h-screen' onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="cardholder_name">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder='e.g.: Jane Appleseed'
                    id='cardholder_name'
                    name='cardholder_name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required />
                </div>
                <div>
                  <label htmlFor="card_number">Card Number</label>
                  <input
                    type="text"
                    placeholder='e.g. 1234 5678 9123 0000'
                    id='card_number'
                    name='card_number'
                    maxLength={19}
                    value={cardNumber
                      .replace(/\s/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim()}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required />
                </div>

                <article className='flex items-center justify-between gap-8'>
                  <div className='flex-1'>
                    <label htmlFor="expiry_date">Exp. Date (MM/YY)</label>
                    <input type="month"
                      placeholder='MM YY'
                      name='expiry_date'
                      id='expiry_date'
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required />
                  </div>
                  <div className='flex-1'>
                    <label htmlFor="cvc">CVC</label>
                    <input type="number"
                      placeholder='e.g. 123'
                      name='cvc'
                      id='cvc'
                      maxLength={3}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      required />
                  </div>
                </article>
                <button
                type='submit'
                className='bg-Verydarkviolet py-3 px-6 text-White rounded shadow 
                text-base tracking-wide lg:text-lg hover:bg-White border 
                hover:border-Verydarkviolet hover:text-Verydarkviolet 
                transition duration-[0.3s]'>Confirm</button>

              </form>}


            {confirmed && <ThankYou setConfirmed={setConfirmed} />}
          </div>
        </div>



      </section>
    </>
  )
}
function ThankYou({ setConfirmed }) {
  return (
    <>
      <div className="thank-you flex flex-col items-center justify-center lg:h-screen max-w-lg mx-auto mt-8">
        <img src={check} alt="Card Added Check Image" className='block mx-auto' />
        <h1 className='text-Verydarkviolet text-3xl mb-6 uppercase text-center my-6'>Thank you!</h1>
        <p className='text-Darkgrayishviolet text-center '>We've added your card details</p>
        <button onClick={() => setConfirmed(false)} className='bg-Verydarkviolet py-3 px-6 text-White rounded shadow text-base tracking-wide lg:text-lg hover:bg-White border hover:border-Verydarkviolet hover:text-Verydarkviolet transition duration-[0.3s] block mx-auto mt-10 w-full'>Continue</button>
      </div>
    </>
  )
}

