import React, { useEffect, useState, useRef } from "react"
import "./styles/Header.css"

export default function Header({ logo, marca }) {
    const [toggle, setToggle] = useState("/public/icons/menu.svg")
    const listaRef = useRef(null);

    useEffect(() => {
        const lista = listaRef.current;
        if (lista) {
          const enlaces = lista.querySelectorAll("a");
          enlaces.forEach((enlace) => {
            enlace.addEventListener("click", () => {
              lista.style.height = "0px"
              lista.style.top = "28px"
              if (window.scrollY > 50)
                setToggle('/public/icons/menu-black.svg')
              else setToggle('/public/icons/menu-black.svg')
            });
          });
      
          return () => {
            enlaces.forEach((enlace) => {
              enlace.removeEventListener("click", () => {
                lista.style.height = "0px"
                lista.style.top = "28px"
                if (window.scrollY > 50)
                    setToggle('/public/icons/menu-black.svg')
                else setToggle('/public/icons/menu-black.svg')
              });
            });
          };
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById("navbar")
            const marca = document.querySelector("header h1")

            if (window.scrollY > 50) {
                navbar.style.backgroundColor = "#fff"
                marca.style.color = "#151515"
                if (toggle === '/public/icons/menu.svg' || toggle === '/public/icons/menu-black.svg')
                    setToggle('/public/icons/menu-black.svg')
                else setToggle('/public/icons/close-black.svg')
            } else {
                navbar.style.backgroundColor = "#151515"
                marca.style.color = "#fff"
                if (toggle === '/public/icons/menu.svg' || toggle === '/public/icons/menu-black.svg')
                    setToggle('/public/icons/menu.svg')
                else setToggle('/public/icons/close.svg')
            }
        };

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll);
    }, [toggle])

    const handleClick = () => {
        if (window.scrollY <= 50) {
            if (toggle === "/public/icons/menu.svg") {
                setToggle("/public/icons/close.svg")
            } else {
                setToggle("/public/icons/menu.svg")
            }
        }
        else {
            if (toggle === "/public/icons/menu-black.svg") {
                setToggle("/public/icons/close-black.svg")
            } else {
                setToggle("/public/icons/menu-black.svg")
            }
        }

        const lista = listaRef.current
       if (lista) {
            const currentHeight = parseInt(window.getComputedStyle(lista).height, 10);
            if (currentHeight > 0) {
                lista.style.height = "0px"
                lista.style.top = "28px"
            } else {
                lista.style.height = "192px"
                lista.style.top = "60px"
            }
       }
    }

    return (
        <header>
            <nav id="navbar">
            <img src={logo} alt="Logo" />
            <h1>{marca}</h1>
            <button onClick={handleClick}>
                <img src={toggle} alt="toggle" />
            </button>
            </nav>
            <ul ref={listaRef}>
                <li><a href="#about">¿Quiénes Somos?</a></li>
                <li><a href="#vehiculo">Acerca del Vehículo</a></li>
                <li><a href="#viajes">Ofertas de Viaje</a></li>
                <li><a href="#pagos">Métodos de Pago</a></li>
                <li><a href="#contact">Contáctanos</a></li>
            </ul>
        </header>
    );
}
