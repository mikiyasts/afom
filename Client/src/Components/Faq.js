import React from 'react'
import { AiOutlineDown,AiOutlineUp} from "react-icons/ai";
function Faq() {
    const handleDrop=(e)=>{
        const selected=document.getElementById(`q${e}`)
        const dropSelected=document.getElementById(`aq${e}a`)
        const dropSelectedU=document.getElementById(`aq${e}`)
        
        if(selected){
            selected.classList.toggle('activeans')
            dropSelected.classList.toggle('activedrop')
            dropSelectedU.classList.toggle('activedropu')
        }
    }
  return (
    <section className='faq' id="Faq">
        <div className="faq_container">
        <div className="faq_left">
            <div className="questions"   onClick={()=>handleDrop(1)}>
                <div className="q_container q1">
                    <p className='question '>How can I order?</p>
                    <div className="drop-icon"><AiOutlineDown fill="black" size={25} style={{fontSize:"large"}} id="aq1a"/> <AiOutlineUp className='dropUp' fill="black" size={25} style={{fontSize:"large"}} id="aq1"/></div>
                </div>
                    <p className="answer ans1" id="q1">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit pariatur ducimus cum numquam eius, tenetur omnis temporibus unde qui beatae aliquid alias. Nemo numquam aperiam veritatis neque recusandae accusantium. Omnis error quod repellendus quas ea laudantium earum enim vel! Vero.</p>
                
            </div>
            <div className="questions"   onClick={()=>handleDrop(2)}>
                <div className="q_container q2">
                    <p className='question '>What tools do we use to design?</p>
                    <div className="drop-icon"><AiOutlineDown fill="black" size={25} style={{fontSize:"large"}} id="aq2a"/> <AiOutlineUp className='dropUp' fill="black" size={25} style={{fontSize:"large"}} id="aq2"/></div>
                </div>
                    <p className="answer ans2" id="q2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit pariatur ducimus cum numquam eius, tenetur omnis temporibus unde qui beatae aliquid alias. Nemo numquam aperiam veritatis neque recusandae accusantium. Omnis error quod repellendus quas ea laudantium earum enim vel! Vero.</p>
                
            </div>
            <div className="questions"   onClick={()=>handleDrop(3)}>
                <div className="q_container q3">
                    <p className='question '>Our work enviroment?</p>
                    <div className="drop-icon"><AiOutlineDown fill="black" size={25} style={{fontSize:"large"}} id="aq3a"/> <AiOutlineUp className='dropUp' fill="black" size={25} style={{fontSize:"large"}} id="aq3"/></div>
                </div>
                    <p className="answer ans3" id="q3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit pariatur ducimus cum numquam eius, tenetur omnis temporibus unde qui beatae aliquid alias. Nemo numquam aperiam veritatis neque recusandae accusantium. Omnis error quod repellendus quas ea laudantium earum enim vel! Vero.</p>
                
            </div>
            <div className="questions"   onClick={()=>handleDrop(4)}>
                <div className="q_container q4">
                    <p className='question '>What payment methods do we accept?</p>
                    <div className="drop-icon"><AiOutlineDown fill="black" size={25} style={{fontSize:"large"}} id="aq4a"/> <AiOutlineUp className='dropUp' fill="black" size={25} style={{fontSize:"large"}} id="aq4"/></div>
                </div>
                    <p className="answer ans4" id="q4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit pariatur ducimus cum numquam eius, tenetur omnis temporibus unde qui beatae aliquid alias. Nemo numquam aperiam veritatis neque recusandae accusantium. Omnis error quod repellendus quas ea laudantium earum enim vel! Vero.</p>
            </div>
            <div className="questions"   onClick={()=>handleDrop(5)}>
                <div className="q_container q5">
                    <p className='question '>Where can you find us?</p>
                            <div className="drop-icon"><AiOutlineDown fill="black" size={25} style={{fontSize:"large"}} id="aq5a"/> <AiOutlineUp className='dropUp' fill="black" size={25} style={{fontSize:"large"}} id="aq5"/> </div>
                </div>
                    <p className="answer ans5" id="q5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit pariatur ducimus cum numquam eius, tenetur omnis temporibus unde qui beatae aliquid alias. Nemo numquam aperiam veritatis neque recusandae accusantium. Omnis error quod repellendus quas ea laudantium earum enim vel! Vero.</p>
                
            </div>
        </div>
        <div className="faq_right">
            <div className="faq_header">
            <p>- FAQ</p>
            </div>
            <h1 className='questionslook'>Questions?<br/> Look here.</h1>
        </div>
        </div>
    </section>
  )
}

export default Faq
