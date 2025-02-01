import {ReactNode} from 'react';
import './styles.css';

const Section = ({children}: {children: ReactNode}) => {
    return <div className="section">{children}</div>;
};
export default Section;
