import Button from '@mui/material/Button';

const Submit = ({ value, method }) => (
    <div>
        <Button onClick={method} color="success" type="submit" variant="contained">{value}</Button>
    </div>
)

export default Submit;