export default function createPaymentOptions() {

    const paymentoptions = document.querySelector('.paymentoptions');
    paymentoptions.innerHTML = `<div class="py-5 text-center options_bg">
		<div class="container">
		  <div class="row">
			<div class="mx-auto col-md-8">
			  <h1 class="py-3">Payment Options</h1>
			  <p class="mb-4 py-3">
				Europe's largest selection of fashion & trends.&nbsp;
			  </p>
			  <div class="row text-muted">
				<div class="col-md-2 col-4 p-2">
				  <i class="d-block fa fa-3x fa-cc-mastercard"></i>
				</div>
				<div class="col-md-2 col-4 p-2">
				  <i class="d-block fa fa-cc-visa fa-3x"></i>
				</div>
				
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>`;
};