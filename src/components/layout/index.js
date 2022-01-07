import react from "react";
import useGithub from "../../hooks/github-hooks";
import Header from "../header";
import * as S from "./styled"; 

const Layout = ({Children}) => {
    
    const { githubState } = useGithub();
    return ( 
    <S.WrapperLayput>
        <Header />
        {Children}
    </S.WrapperLayput>
    );
};

export default Layout;