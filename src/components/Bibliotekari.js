import React, { useState, useEffect } from "react";
import "./Bibliotekari.css";
import Sidebar from "./Sidebar";
import Header from "../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Bibliotekari = () => {
  const [bibliotekari, setBibliotekari] = useState([]);
  const [selectedBibliotekar, setSelectedBibliotekar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBibliotekari = async () => {
      
     const token = "3131|64rZqreizvGGqLCfxeLKxCTDa2jtu4W1Hx0QPXqL";


      try {
        const response = await axios.get("https://biblioteka.simonovicp.com/api/users/", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        const data = response.data;
        const bibliotekari = data.filter(user => user.role === "Bibliotekar");
        setBibliotekari(bibliotekari);
      } catch (error) {
        console.error("Greška prilikom fetchovanja bibliotekara:", error);
      }
    };

    fetchBibliotekari();
  }, []);

  const handleMenuToggle = (id) => {
    setSelectedBibliotekar(selectedBibliotekar === id ? null : id);
  };

  const handleAction = (action, id) => {
    if (action === "Brisanje") {
      setBibliotekari(bibliotekari.filter((user) => user.id !== id));
    } else {
      console.log(`${action} user with id: ${id}`);
    }
    setSelectedBibliotekar(null);
  };

  const newBibliotekar = () => {
    navigate("/bibliotekari/add");
  };

  return (
    <div className="bibliotekari-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="bibliotekari-content">
          <button className="new-bibliotekar-btn" onClick={newBibliotekar}>
            <FontAwesomeIcon icon={faPlus} /> NOVI BIBLIOTEKAR
          </button>
          <table className="bibliotekari-table">
            <thead>
              <tr>
                <th>Ime i prezime</th>
                <th>Email</th>
                <th>Tip korisnika</th>
                <th>Zadnji pristup sistemu</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bibliotekari.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input type="checkbox" />
                    <img
                      src={user.photoPath}
                      alt="slika"
                      className="profile-pic"
                    />
                    {user.name} {user.surname}
                  </td>
                  <td>{user.email}</td>
                  <td className="actions">
                    <FontAwesomeIcon
                      icon={faEllipsisV}
                      onClick={() => handleMenuToggle(user.id)}
                    />
                    {selectedBibliotekar === user.id && (
                      <div className="dropdown-menu">
                        <button
                          onClick={() =>
                            handleAction("Pregled", user.id)
                          }
                        >
                          Pregled korisnika
                        </button>
                        <button
                          onClick={() => handleAction("Update", user.id)}
                        >
                          Update korisnika
                        </button>
                        <button
                          onClick={() =>
                            handleAction("Brisanje", user.id)
                          }
                        >
                          Brisanje korisnika
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bibliotekari;
