import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisits/get_all_patient_encounter_note.php';
const rawHtml = `
<div class="row">
    <div class="col-md-12">
        <!--Problems Card-->
        <div class="card bg-light mb-3 problemsCard with-transform" style="min-height: 370px;">
            <div class="card-header  ">
                Problems <span class="float-right">(All Active)</span>
            </div>
            <div class="card-body">
                <!--Complaints-->
                <span class="float-left text-primary">Complaints</span><span class="ml-2" id="complaint-action-span"></span><br>
                <div class="">
                    <!--set class d-none when live-->
                    <div class="cc-small-card" id="problem_complaints_noneText">
                        <span class="">
                            <!-- php: foreach ($encounters as $key => $encounter): -->

                                <span class="badge badge-primary"><!-- php: =$encounter->date_created ? $encounter->date_created->nice() : $encounter->patient_visit->date_created->nice() --></span>
                                <!-- php: = $encounter->cc -->
                                <br/>
                            <!-- php: endforeach; -->
                        </span>
                    </div>
                </div>

                <!--ODQs-->
                <span class="float-left text-primary">ODQs</span><span class="ml-2" id="odqs-action-span"></span><br>
                <div class="">
                    <!--set class d-none when live-->
                    <div class="all-odqs-small-card" id="problem_complaints_noneText">
                    </div>
                </div>

                <!--Comorbidity-->
                <span class="float-left text-primary">Comorbidity</span><span class="ml-2" id="comorbidity-action-span"></span><br>
                <div class="">
                    <!--set class d-none when live-->
                    <div class="all-comorbidities-small-card" id="problem_complaints_noneText">
                        <span class="">
                            None
                        </span>
                    </div>

                </div>




                <!--System review-->
                <span class="float-left text-primary">System Review</span><span class="ml-2" id="system-review-span"></span><br>
                <div class="pl-4">


                    <div class="row">
                        <div class="review-small-card" id="problem_complaints_noneText">
                            <span class="">
                                None
                            </span>
                        </div>


                    </div>
                </div>



            </div>
            <div class="pr-3 pb-2">
                <span href="javascript:;" class="pull-right text-slate-900 text-primary" onclick="showAllEncounteredProblems()"> View All Problems</span>
            </div>
        </div>
        <!--//Problems Card-->

    </div>
</div>

<script>
    function populateAllOdqs(odqs)
	{
		if(odqs){
			for(var i in odqs){
				odq_severity = "<span class='badge rounded-pill' style='background-color: "+odqs[i].odq_severity.color_code+"'>"+odqs[i].odq_severity.severity+"</span>"
				odq_duration = "<span class='badge rounded-pill'>"+odqs[i].odq_duration.duration+"</span>"
				$(".all-odq-list-class").append("<li class='mb-1' data-toggle='tooltip' data-placement='top' title='"+odqs[i].odq_comment+"'>"+ odqs[i].odq.name+ " in " + odq_severity + " state within " + odq_duration + "</li>")
			}
		}else{
			// $(".all-odqs-small-card").html("<span class='bold'>None</span>")
		}
	}

    function populateAllComorbidities(comorbidities)
	{
		if(comorbidities){

            $(".all-comorbidities-list-class").append("<li class='mb-1' data-toggle='tooltip' data-placement='top' title='"+comorbidities.comment+"'>"  + \`\${comorbidities + "" || ''}\` + "</li>")
		}else{
			// $(".all-comorbidities-small-card").html("<span class='bold'>None</span>")
		}
	}

    $(".all-odqs-small-card").html("<span><ul class='all-odq-list-class'></ul></span>")
    $(".all-comorbidities-small-card").html("<span><ul class='all-comorbidities-list-class'></ul></span>")

    
    <!-- php: foreach ($encounters as $key => $encounter): -->
        populateAllOdqs(<!-- php: = json_encode($encounter->patient_visit_clinical_encounter_note_odqs) -->)
        populateAllComorbidities(<!-- php: = json_encode($encounter->past_illnes_hx) -->)
    <!-- php: endforeach; -->

</script>
`;

export default function PatientVisitsGetAllPatientEncounterNotePage() {
  return (
    <PageShell title="PatientVisits/get_all_patient_encounter_note.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
