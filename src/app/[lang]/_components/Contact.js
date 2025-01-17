"use client";
import React, { useState } from "react";
import Input from "./Elements/Input";
import { motion } from "framer-motion";

function Contact({ data, links, lang }) {
  const { asset, title, description, sendButton, inputs } = data;
  const value = links[4][lang];
  
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (label, value) => {
    let field;
    switch (label.toLowerCase()) {
      case "nom":
      case "name":
        field = "Name";
        break;
      case "email":
      case "e-mail":
        field = "Email";
        break;
      case "téléphone":
      case "phone":
      case "phone number":
        field = "Phone";
        break;
      case "message":
        field = "Message";
        break;
      default:
        field = label;
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.Email || !formData.Message) {
      setError(lang === 'fr' ? 'Email et message sont requis' : 'Email and message are required');
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch('https://ipadviceandservices.com/api/send-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setFormData({
          Name: "",
          Email: "",
          Phone: "",
          Message: ""
        });
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (err) {
      setError(lang === 'fr' 
        ? "Échec de l'envoi du message. " + (err.message || "Veuillez réessayer.") 
        : "Failed to send message. " + (err.message || "Please try again."));
      console.error("Email send error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id={value} className="flex flex-row">
      <div className="flex flex-col w-full gap-8 px-20 max-md:py-[100px] py-[120px]">
        <h1 className='text-[8.5rem] max-md:text-[52px] max-md:tracking-[-2px] font-normal leading-[9rem] text-secondary font-["Scheherazade_New"] tracking-[-8px] uppercase'>
          {title[lang]}
        </h1>
        <div className="w-[80%] flex flex-col max-md:gap-[22px] gap-5">
          <div className="w-40 h-px bg-secondary"></div>
          <p className='font-["Montserrat"] max-md:text-[16px] leading-[20.8px] text-xl text-white'>
            {description[lang]}
          </p>
        </div>
        <div className="grid max-md:mt-[60px] max-md:gap-[38px] w-full grid-cols-1 sm:grid-cols-3 gap-9">
          {inputs?.map(
            (p, i) =>
              i !== inputs.length - 1 && (
                <Input 
                  key={i} 
                  label={p[lang]}
                  onChange={(e) => handleInputChange(p[lang], e.target.value)}
                />
              )
          )}
        </div>
        <div className="max-md:mt-[32px]">
          <Input 
            label={inputs[inputs.length - 1][lang]}
            onChange={(e) => handleInputChange("Message", e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-400 mt-4 text-sm">
            {error}
          </p>
        )}

        {success && (
          <p className="text-secondary mt-4 text-sm">
            {lang === 'fr' ? 'Message envoyé avec succès!' : 'Message sent successfully!'}
          </p>
        )}

        <motion.button
          onClick={handleSubmit}
          disabled={isLoading}
          whileHover="hover"
          initial="rest"
          animate="rest"
          className={`text-secondary max-md:mt-[92px] max-md:text-[12px] w-fit mt-16 text-xl font-semibold tracking-[-1px] cursor-pointer ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full inline-block"
              />
              {lang === 'fr' ? 'Envoi...' : 'Sending...'}
            </span>
          ) : (
            <>
              {sendButton[lang]}
              <motion.span
                className="ml-2 inline-block"
                variants={{
                  rest: { x: 0 },
                  hover: { x: 5 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                →
              </motion.span>
            </>
          )}
        </motion.button>
      </div>
      <div>
        <img
          className="hidden w-full h-full lg:block"
          src={asset}
          alt="contact img"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Contact;