import './Button.scss';

interface ButtonProps {
    children: string
    onClick?: () => any
}

function Button(props: ButtonProps) {
    const { onClick = () => {} } = props;
    return (
        <>
            <button className="btn" onClick={onClick}>{props.children}</button>
        </>
    )
}

export default Button;