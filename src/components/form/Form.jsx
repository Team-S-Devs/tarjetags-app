const Form = ({ children, submit, formRef, change }) => {
    return(
        <form onSubmit={submit} ref={formRef} onChange={change}>
            {children}
        </form>
    )
}

export default Form;