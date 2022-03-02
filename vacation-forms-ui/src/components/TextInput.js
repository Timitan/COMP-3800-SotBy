const TextInput = ({ text }) => {
    return (
    <form className="add-form">
         <div className='form-control'>
             <label>{text}</label>
             <input type='text' placeholder={text + '...'} />
         </div>
    </form>
    )
};

export default TextInput;
