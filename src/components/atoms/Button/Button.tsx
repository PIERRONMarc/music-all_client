import './Button.scss';

interface ButtonProps {
    children: string
}

function Button(props: ButtonProps) {
    return (
        <>
            <button className="btn">{props.children}</button>
        </>
    )
}

export default Button;