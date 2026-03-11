import PageShell from '../../components/PageShell';

const sourcePath = 'templates/CreditClaims/submit_claim.php';
const rawHtml = `
<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <h2 class="text-center text-justify font-weight-bold text-uppercase">National Health Insurance Scheme</h2>
                    <h3 class="text-center text-justify font-weight-bold text-uppercase">City Hospital</h3>
                    <div class="row">
		                <div class="col-md-2 text-underline font-weight-bold">
                            <u>Claim Form</u><br>
                            (Regulation 62)
                        </div>
                        <div class="col-md-4">
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-5 col-form-label font-weight-bold">Scheme Name</label>
                                <div class="col-sm-5">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="SUBIN SUB METRO">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-5 col-form-label font-weight-bold">Scheme Code</label>
                                <div class="col-sm-5">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-5 col-form-label  font-weight-bold">Health Facility Code</label>
                                <div class="col-sm-5">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="NHIA-00100">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-5 col-form-label font-weight-bold">Form No</label>
                                <div class="col-sm-5">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="1">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-5 col-form-label font-weight-bold">Date of Claim</label>
                                <div class="col-sm-5">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="31/01/2017">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-5 col-form-label font-weight-bold">Batch No</label>
                                <div class="col-sm-5">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="1706">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <img alt="Bootstrap Image Preview" src="https://www.layoutit.com/img/sports-q-c-140-140-3.jpg" style="float:left display: block; margin:-6px;"/> -->
                    <hr style="height:3px;border:none;color:#333;background-color:#333;">
                    <h5 class="font-weight-bold text-uppercase">client information</h5>
                    <div class="row">
                        <div class="col-md-5">
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-5 col-form-label font-weight-bold">Surname</label>
                                <div class="col-sm-5">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="Anwaar">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-5 col-form-label font-weight-bold">Other Names</label>
                                <div class="col-sm-5">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="Sadat Shaibu">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-5 col-form-label  font-weight-bold">Date of Birth</label>
                                <div class="col-sm-5">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="06/01/1998">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-5 col-form-label font-weight-bold">Card Serial Number</label>
                                <div class="col-sm-5">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="12345678">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-5 col-form-label font-weight-bold">Member Number</label>
                                <div class="col-sm-5">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="123456789">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-5 col-form-label font-weight-bold">Age</label>
                                <div class="col-sm-5">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="24">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-5 col-form-label font-weight-bold">Hospital Record Number</label>
                                <div class="col-sm-5">
                                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="G0209/7">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <fieldset style="">
                                <legend>Gender:</legend>
                                <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-5 col-form-label font-weight-bold">Batch No</label>
                                    <div class="col-sm-5">
                                        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="1706">
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
</div>
`;

export default function CreditClaimsSubmitClaimPage() {
  return (
    <PageShell title="CreditClaims/submit_claim.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
