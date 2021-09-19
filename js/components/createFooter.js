export default function createFooter() {

    const footer = document.querySelector("footer");
    footer.innerHTML = `
    <div class="footer-wrapper">
	     <div class="footer-wrapper-column column-location">
			<h4>Location <a href="https://www.google.com/maps/place/Fyllingsdalen,+Bergen/@60.3078789,5.1248253,11z/data=!3m1!4b1!4m5!3m4!1s0x463cfbe85a8dbf59:0xf4de974d64192c22!8m2!3d60.3461034!4d5.2884297"></a> 
					<i class="fas fa-map-marked-alt" aria-hidden="true"></i><span class="sr-only">Maps</span></a></h4>
						<p>
							Fyllingsdalen, 
							<br>
							5144 Bergen
						</p>
		 </div>
	 <div class="footer-wrapper-column column-contact">
			<h4>Contact</h4>
				   <a href="bergs@email.com" class="footer-email">info@bergs.com</a>
				   <p>+47 999 99 9999</p>
			       <p>or write us a message <a href="contactus.html" title="Contact Us">here</a></p>
	</div>
		
	</div>
		<div class="Follow us">
			<h4>Follow us</h4>
			 <a href="#" class="icon" title="Facebook">
			 <i class="fab fa-facebook" aria-hidden="true"></i>
			 </a>
			 <a href="#" class="icon" title="Instagram">
			 <i class="fab fa-instagram" aria-hidden="true"></i>
			 </a>
			 <a href="#" class="icon" title="Twiter">
			 <i class="fab fa-twitter" aria-hidden="true"></i>
			 </a>
			 <a href="https://www.google.com/maps/place/Fyllingsdalen,+Bergen/@60.3078789,5.1248253,11z/data=!3m1!4b1!4m5!3m4!1s0x463cfbe85a8dbf59:0xf4de974d64192c22!8m2!3d60.3461034!4d5.2884297"> 
			 <i class="fas fa-map-marked-alt" aria-hidden="true"></i>
			 <span class="sr-only">Maps</span></a>
		</div>
	   <div class="copyright">
			<p>Bergs Brand 2021 &copy; All Rights Reserved.</p>
		</div>
	</div>
   </footer>`;
};