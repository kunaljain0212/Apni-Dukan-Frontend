import React from "react";
import Base from "./Base";
import me from "./logos/me.jpg";
import git from "./logos/git.png";
import fb from "./logos/fb.png";
import li from "./logos/li.png";
import mail from "./logos/mail.png";
import yt from "./logos/yt.png";

function Contactus() {
  const gitlink = "https://github.com/kunaljain0212";
  const linkedinlink = "https://www.linkedin.com/in/kunaljain0212/";
  const fblink = "https://www.facebook.com/profile.php?id=100011437868777";
  const ytlink = "https://www.youtube.com/channel/UCi7H3jhe8thIs5XBPrvE0wg";

  return (
    <Base
      title="Contact Us"
      description="Hi there!! My name is Kunal Jain, I'm currently a student at IIIT Gwalior. You can reach out to me through the following social media handles."
    >
      <div className="justify-content-center text-center">
        <div
          style={{ height: "300px", width: "250px" }}
          className="mx-auto rounded"
        >
          <img
            src={me}
            alt="Product"
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            className="border border-dark rounded"
          />
        </div>
        <br />
        <div className="">
          <a href={gitlink} target="_blank" rel="noopener noreferrer">
            <img
              src={git}
              className="logos"
              style={{ width: "40px", height: "40px", margin: "10px" }}
              alt="ME"
            />
          </a>
          <a href={fblink} target="_blank" rel="noopener noreferrer">
            <img
              src={fb}
              className="logos"
              style={{ width: "40px", height: "40px", margin: "10px" }}
              alt="ME"
            />
          </a>
          <a href={ytlink} target="_blank" rel="noopener noreferrer">
            <img
              src={yt}
              className="logos"
              style={{ width: "40px", height: "40px", margin: "10px" }}
              alt="ME"
            />
          </a>
          <a href={linkedinlink} target="_blank" rel="noopener noreferrer">
            <img
              src={li}
              className="logos"
              style={{ width: "40px", height: "40px", margin: "10px" }}
              alt="ME"
            />
          </a>
          <a
            href="mailto:jainkunal209@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={mail}
              className="logos"
              style={{ width: "40px", height: "40px", margin: "10px" }}
              alt="ME"
            />
          </a>
        </div>
      </div>
    </Base>
  );
}

export default Contactus;
