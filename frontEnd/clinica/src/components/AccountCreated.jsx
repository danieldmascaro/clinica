import { useLocation, Link} from "react-router-dom";


const AccountCreated = () => {
    const location = useLocation();
    const { formData } =location.state || {};
    return <div>
        <h1>¡Cuenta creada con éxito, {formData?.nombres}! Recibirás un correo electrónico para validar tu cuenta.</h1>
        <h1>¿No recibiste el correo? <Link to="/resendmail" state={{ formData }}>Haz click aquí para reenviarlo.</Link></h1>
    </div>
}

export default AccountCreated;