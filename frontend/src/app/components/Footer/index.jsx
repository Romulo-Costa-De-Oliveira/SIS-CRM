import React from "react";

function Footer() {

    var ano = new Date().getFullYear();

    return (
        <div>Desenvolvido por Rabolinha Coders - {ano}</div>
    );
}

export default Footer;