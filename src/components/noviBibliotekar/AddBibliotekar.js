import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../header/Header";
import { useNavigate } from "react-router-dom";
import "./AddBibliotekar.css";

const AddBibliotekar = ({ onAddLibrarian }) => {
  const [formData, setFormData] = useState({
    ime: "",
    prezime: "",
    jmbg: "",
    email: "",
    korisnickoIme: "",
    sifra: "",
    ponovljenaSifra: "",
    slika: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, slika: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
      //logika
    
      
        try {
          const token = localStorage.getItem("jwt");
          const formData = new FormData();
          
          formData.append("name", formData.ime);
          formData.append("surname", formData.prezime);
          formData.append("jmbg", formData.jmbg);
          formData.append("email", formData.email);
          formData.append("username", formData.korisnickoIme);
          formData.append("password", formData.sifra);
          formData.append("role", "Bibliotekar");
      
          if (formData.slika) {
            const fileInput = document.querySelector("#profilePicture");
            formData.append("photo", fileInput.files[0]);
          }
      
          const response = await fetch("https://biblioteka.simonovicp.com/api/users/store", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`
            },
            body: formData
          });
      
          if (!response.ok) {
            throw new Error("Failed to add librarian");
          }
      
          const data = await response.json();
          console.log(data); // Log the response to verify
          if (data.success) {
            navigate("/");
          } else {
            throw new Error(data.message || "Failed to add librarian");
          }
        } catch (error) {
          console.error("Error adding librarian:", error);
        }
      };
      
  


  return (
    <div className="bibliotekar-container">
      <Header />
      <Sidebar />
      <div className="content">
        <h2>Novi Bibliotekar</h2>
        <form className="bibliotekar-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="file"
              className="form-control-file"
              accept="image/*"
              id="profilePicture"
              onChange={handleFileChange}
            />
            <label htmlFor="profilePicture" className="file-label">
              Add photo
            </label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="ime"
              className="form-control"
              placeholder="Unesite ime"
              value={formData.ime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="prezime"
              className="form-control"
              placeholder="Unesite prezime"
              value={formData.prezime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="jmbg"
              className="form-control"
              placeholder="Unesite JMBG"
              value={formData.jmbg}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Unesite E-mail"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="korisnickoIme"
              className="form-control"
              placeholder="Unesite korisnicko ime"
              value={formData.korisnickoIme}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="sifra"
              className="form-control"
              placeholder="Unesite zeljenu sifru"
              value={formData.sifra}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="ponovljenaSifra"
              className="form-control"
              placeholder="Ponovo unesite sifru"
              value={formData.ponovljenaSifra}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="btnss">
            <button type="submit" className="btn-submit">
              Sacuvaj
            </button>
            <button type="button" className="btn-reset" onClick={() => navigate("/bibliotekari")}>
              Ponisti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBibliotekar;
