import "./Footer.scss"
const Footer = () => {
  return (
    <footer>
<div className="footer">
<div className="rowl">
<a href="https://www.facebook.com/AranceNovus"><i className="fa fa-facebook icons"></i></a>
<a href="https://instagram.com/agrofuccio?igshid=ZDc4ODBmNjlmNQ=="><i className="fa fa-instagram icons"></i></a>
<a href="https://github.com/KevinFuccio/Capstone"><i className="fa fa-github icons"></i></a>
<a href="https://www.linkedin.com/in/kevin-fuccio-28bb07267/"><i className="fa fa-linkedin icons"></i></a>
</div>

<div className="rowl">
<ul>
<li><a href="#">Contact us</a></li>
<li><a href="#">Our Services</a></li>
<li><a href="#">Privacy Policy</a></li>
<li><a href="#">Terms & Conditions</a></li>
<li><a href="#">Career</a></li>
</ul>
</div>

<div className="rowl">
AgroFuccio Copyright © {new Date().getFullYear()} AgroFuccio - All rights reserved 
</div>
</div>
</footer>
  );
};
export default Footer;
