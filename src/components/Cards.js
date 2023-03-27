import './Cards.css'

export default function Cards({card, handleChoice, checkClear, flipped, disabled}) {
    const handleClick = () => {
        if (!disabled) {
        handleChoice(card)
        }
    }
    if(checkClear() === true) {
        window.alert("COMPLETED", 5000)
    }
    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
              <img className="front" src={card.img} alt="card front" />
              <img className="back" src='https://cdn.crispedge.com/9556eb.png'
              onClick={handleClick} alt="card back" />
            </div>
        </div>
    )
}