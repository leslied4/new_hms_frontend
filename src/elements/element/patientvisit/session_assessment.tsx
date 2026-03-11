const rawHtml = `
<!-- php: //$requestLabs = isset($requestLabs) ? $requestLabs : $selectedVisit->request_labs; -->

<!--Lab Table section-->
<section class="mb-1">

    <h4 class="col-md-12" id="scanTableDescription">
        <span class="font-weight-bold">Session Assessment and Plan:</span> <br>
        Use this structured form to curate and document all assessments needed, planned treatments and therapies, as well as progress notes for a patient
    </h4>

</section>
<div class=" mt-4">
    <h2 class="text-center mb-2">Submitted Assessments</h2>
    <div class="d-flex" style="overflow-x:scroll; flex-wrap: no-wrap" id="submittedAssessments">
        <!-- Card for each filled form -->
        <div class="col-md-3 mb-3">
            <div class="card border-info">
                <div class="card-header">
                    <h5 class="card-title"></h5>
                </div>
                <div class="card-body">
                    <p><strong>No Submitted Assessments</strong> </p>
                </div>
            </div>
        </div>

    </div>
</div>


<!--New Lab Request Section-->
<!-- php: if ($isCurrentVisit) { -->
    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'PatientVisits', 'action' => 'addSessionAssessmentPlans', $patient->id, $selectedVisit->id], 'id' => 'assessment_plan_form_submit', 'class' => 'row',]); -->

    <div class="container mt-2">
        <h2 class="text-center mb-4">Patient Assessment Form</h2>
        <div class="form-body">

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#subjective').toggle()">
                        Subjective
                    </button>
                </div>
                <div id="subjective" class="card-body" style="display:none">
                    <textarea id="subjective_comment" name="subjective_comment" class="form-control" rows="5" placeholder="Enter subjective comments"></textarea>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#objective').toggle()">
                        Objective
                    </button>
                </div>
                <div id="objective" class="card-body" style="display:none">
                    <textarea id="objective_comment" name="objective_comment" class="form-control" rows="5" placeholder="Enter objective comments"></textarea>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#radiographic').toggle()">
                        Radiographic Analysis
                    </button>
                </div>
                <div id="radiographic" class="card-body" style="display:none">
                    <textarea id="radio_comment" name="radio_comment" class="form-control" rows="5" placeholder="Enter radiographic analysis comments"></textarea>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#assessment_summary').toggle()">
                        Assessment Summary
                    </button>
                </div>
                <div id="assessment_summary" class="card-body" style="display:none">
                    <div class="form-group">
                        <label>Postural Imbalances Observed <span class="required">*</span></label>
                        <input type="text" name="postural_imbalances" class="form-control" placeholder="Enter postural imbalances" />
                    </div>
                    <div class="form-group">
                        <label>Recommendations for Treatment <span class="required">*</span></label>
                        <input type="text" name="treatment_recommendations" class="form-control" placeholder="Enter treatment recommendations" />
                    </div>
                    <div class="form-group">
                        <label>Frequency of Visits <span class="required">*</span></label>
                        <input type="text" name="frequency_of_visits" class="form-control" placeholder="Enter frequency of visits" />
                    </div>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#type_of_intervention').toggle()">
                        Types of Interventions
                    </button>
                </div>
                <div id="type_of_intervention" class="card-body" style="display:none">
                    <div class="form-check">
                        <label>Manual Adjustments <span class="required">*</span></label>
                        <div>
                            <input type="radio" name="manual_adjustments" value="yes" class=""> Yes
                            <input type="radio" name="manual_adjustments" value="no" checked class=""> No
                            <input type="text" name="manual_adjustments_details" class="form-control mt-2" placeholder="Specify details if any" />
                        </div>
                    </div>
                    <div class="form-check">
                        <label>Exercises / Stretching <span class="required">*</span></label>
                        <div>
                            <input type="radio" name="exercises_stretching" value="yes" class=""> Yes
                            <input type="radio" name="exercises_stretching" value="no" checked class=""> No
                            <input type="text" name="exercises_stretching_details" class="form-control mt-2" placeholder="Specify details if any" />
                        </div>
                    </div>
                    <div class="form-check">
                        <label>Other Therapies <span class="required">*</span></label>
                        <div>
                            <input type="radio" name="other_therapies" value="yes" class=""> Yes
                            <input type="radio" name="other_therapies" value="no" checked class=""> No
                            <input type="text" name="other_therapies_details" class="form-control mt-2" placeholder="Specify details if any" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-3">
                <div class="card-header">
                    <button type="button" class="btn btn-link" onclick="$('#progressive_note').toggle()">
                        Progressive Notes (Ongoing Visits)
                    </button>
                </div>
                <div id="progressive_note" class="card-body" style="display:none">
                    <div class="form-group">
                        <label>Sessions Status <span class="required">*</span></label>
                        <input type="text" name="sessions_status" value="active" readonly class="form-control" placeholder="Enter sessions status" />
                    </div>
                    <div class="form-group">
                        <label>Sessions Count <span class="required">*</span></label>
                        <input type="text" name="sessions_count" id="sessions_count" readonly class="form-control" placeholder="Enter sessions count" />
                    </div>
                    <div class="form-group">
                        <label>Changes to Patient Conditions <span class="required">*</span></label>
                        <input type="text" name="changes_to_conditions" class="form-control" placeholder="Enter changes to conditions" />
                    </div>
                    <div class="form-group">
                        <label>Patient Response to Treatment <span class="required">*</span></label>
                        <input type="text" name="patient_response" class="form-control" placeholder="Enter patient response" />
                    </div>
                    <div class="form-group">
                        <label>Any Adjustment to Treatment Plan</label>
                        <div>
                            <input type="radio" name="adjustment_to_plan" value="yes" class=""> Yes
                            <input type="radio" name="adjustment_to_plan" value="no" checked class=""> No
                            <input type="text" name="adjustment_to_plan_details" class="form-control mt-2" placeholder="Specify details if any" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Medications</label>
                        <div>
                            <input type="text" name="medications" class="form-control mt-2" placeholder="Enter Medications" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Nutrition / Diet</label>
                        <div>
                            <input type="text" name="nutrition_diet" class="form-control mt-2" placeholder="Enter Nutrition / Diet" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Physicals</label>
                        <div>
                            <input type="text" name="physicals" class="form-control mt-2" placeholder="Enter Physicals" />
                        </div>
                    </div>


                    <div class="form-group">
                        <label>Lifestyle Recommendations <span class="required">*</span></label>
                        <input type="text" name="lifestyle_recommendations" class="form-control" placeholder="Enter lifestyle recommendations" />
                    </div>
                    <div class="form-group">
                        <label>Date of Next Visit <span class="required">*</span></label>
                        <input type="date" name="next_visit_date" id="next_visit_date" readonly class="form-control" />
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-md-6 offset-md-3">
                    <button type="submit" class="btn btn-lg btn-info w-100">Finalize Documentation</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade bd-example-modal-lg" id="assessment_view_modal" tabindex="-1" role="dialog"
        aria-labelledby="select" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Details</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body assessment_details p-0 m-0">


                </div>
            </div>
        </div>
    </div>

    <style>
        .form-infomation::-webkit-scrollbar {
            width: 10px;
        }

        /* Track */
        .form-infomation::-webkit-scrollbar-track {
            background: #f1f1f1; 
        }

        /* Handle */
        .form-infomation::-webkit-scrollbar-thumb {
            background: #888; 
        }

        /* Handle on hover */
        .form-infomation::-webkit-scrollbar-thumb:hover {
            background: #555; 
        }
    </style>

    <!-- php: = $this->Form->end() -->


<!-- php: } -->

<script>
    scan_object = {};

    function generateAssessmentInfo(info) {
        return \`
            <div class="col-md-3 mb-1">
                <div class="card border-info">
                    <div class="card-header">
                        <h5 class="card-title">\${new Date(info.date_added).toGMTString()}</h5>
                    </div>
                    <div class="card-body">
                        <p><strong>Filled By:</strong>\${info.user?.first_name || ''} \${info.user?.last_name || ''}</p>
                        <button class="btn btn-xs btn-primary" onclick="viewAssessmentDetails('\${(info.id)}')">View Details</button>
                    </div>
                </div>
            </div>
        \`
    }

    function viewAssessmentDetails(assessment_id) {
        $('.modal-body.assessment_details').load(
            "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'singleChiroAssessmentPlanVisitReport', isset($selectedVisit) ? $selectedVisit->patient_id : '', isset($selectedVisit) ? $selectedVisit->id : '']) -->/"+assessment_id,
            function () {
                $('#' + 'assessment_view_modal').modal({
                    show: true
                });
            });
    }

    function populateSessionStatuses() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'sessionProgressNotes', $selectedVisit->patient_id, $selectedVisit->id]) -->",
			success: function g(data, textStatus) {
				$('#sessions_count').val(data['session_count'])
				$('#next_visit_date').val(data['next_visit'])

			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});
	}

	function populateSessionAssessments() {
		$.ajax({
			type: "GET",
			url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'getSessionAssessmentPlans', $selectedVisit->patient_id, $selectedVisit->id]) -->",
			success: function g(data, textStatus) {
				result = ''
                data.forEach(ele => {
                    result+=generateAssessmentInfo(ele)
                });
                if ((data.length) > 0) {
                    
                    $('#submittedAssessments').html(result)
                }

			},
			fail: function g(xhr, textStatus, errorThrown) {
				console.log(xhr);
			}
		});

        populateSessionStatuses()
	}
    function showSessionAssessmentInfo(title, info, cardStyle) {
        return \`
            <div class="card bg-light mb-3 with-transform" style="width: 100%; box-shadow:none;border-color:\${cardStyle}">
                <div class="card-body" style="background:white">
                    <h5 class="card-subtitle mb-2">\${title}</h5>
                    <p class="card-text text-muted">\${info}</p>
                </div>
            </div>
        \`
    }

    function itemResult(info) {
        if(['9', '10'].includes(info.item_type_id)) {
            return info.item.full_name
        } else if(info.item_type_id == '2') {
            return info.lab_test.name
        } else if(info.item_type_id == '7') {
            return info.radiology_scan.name
        } else if(info.item_type_id == '3') {
            return info.procedure_stock.name
        }
    }
    function sessionAssessmentChange(ele, event) {
        let bundled_items = $("#bundled_services_id option:selected").attr('data-bundled-items')
        console.log("Bundled Items", bundled_items)
        let bundled_json = JSON.parse(bundled_items)
        let result = bundled_json.map(ele => {
            return showSessionAssessmentInfo(
                itemResult(ele), ele.invoice_item_type.name, '#61affe'
            )
        });
        

        $('#process_bundled_items').html(
            result
        )
    }

    function submitSessionAssessment(link, value, table=null) {
      $.ajax({
        type: "POST",
        url: link,
        data: value,
        success: function g(data, textStatus) {
            // flash_message(data['status'], data['message'])
            // console.log(value["radioScans"])
            alertify.success("Record Has been Saved");
            // clearScan()
            // clearLabsForm()
            // $(\`#\${table}\`).DataTable().ajax.reload();
            populateSessionAssessments()
        },
        fail: function g(xhr, textStatus, errorThrown) {
            console.log(xhr);
        }
      });
    }

    $('#assessment_plan_form_submit').submit(function(e){
        e.preventDefault();
        form = document.getElementById('assessment_plan_form_submit')
        var data = $('#assessment_plan_form_submit').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        data['frequency'] = 1
        if(!!data.scan_date_range){
            let newDateRange = data.scan_date_range.split('-')

            data['start_date'] = moment( newDateRange[0]).format('YYYY/MM/DD')
            data['end_date'] = moment( newDateRange[1]).format('YYYY/MM/DD')
            data['frequency'] = $('#scan_freq_text').html()
        }
        var action = form.action

      submitSessionAssessment(action,data, "bundled_service_table")
    })



</script>
<script type="text/javascript">



</script>

`;

export default function ElementElementPatientvisitSessionAssessment() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
