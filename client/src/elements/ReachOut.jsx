import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useColorModeValue } from "../components/ui/color-mode.jsx";
import { CiLinkedin } from "react-icons/ci";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
const ReachOut = ({ onClose, setReachOut, setShowProfile }) => {
  const navigate = useNavigate();

  const cardBg = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(26, 32, 44, 0.95)"
  );
  const textColor = useColorModeValue("#4a5568", "#a0aec0");
  const buttonBg = useColorModeValue(
    "linear-gradient(45deg, #4299e1, #3182ce)",
    "linear-gradient(45deg, #3182ce, #2b6cb0)"
  );
  const hoverBg = useColorModeValue(
    "rgba(0, 0, 0, 0.05)",
    "rgba(255, 255, 255, 0.1)"
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 500,
        padding: "20px",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: cardBg,
          color: textColor,
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          width: "90%",
          maxWidth: "400px",
          position: "relative",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              color: textColor,
            }}
          >
            Let's have a word
          </h2>
          <IoMdClose
            size="24px"
            onClick={() => onClose(true)}
            style={{
              cursor: "pointer",
              color: textColor,
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#e53e3e";
            }}
            onMouseOut={(e) => {
              e.target.style.color = textColor;
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >     
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: textColor,
                marginBottom: "5px",
              }}
            >
              Hello Everyone this is Akshat Jain
            </p>
          </div>

          <div
            style={{
              height: "1px",
              background: "rgba(0, 0, 0, 0.1)",
              margin: "10px 0",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <a
              href="https://twitter.com/jain_akshat01"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "2em", color: "inherit" }}
            >
              <FaSquareXTwitter />
            </a>
            <a href="https://www.linkedin.com/in/akshat-jain-813a10330/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "2em", color: "inherit" }}
            >
              <CiLinkedin style={{ fontSize: "2.4rem" }} />
            </a>
            <a href="mailto:jainakshat_02@protonmail.com">
            <CiMail style={{ fontSize: "2.2rem" }} />
            </a>
            <a href="https://github.com/Jain-Akshat02">
            <FaGithub style={{ fontSize: "2rem" }} />
            </a>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ReachOut;
