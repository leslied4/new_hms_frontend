const rawHtml = `

<style>
    .black_button {
        color:white;
        background: #6c757d;
    }
    .white_button {
        color:black;
        background: white;
    }
</style>
<div class="row">

    <div class="borderBox light bordered col-md-12">
        
        <div class="borderBox-body">
            <div class="tab-content">
                <div class="tab-pane active" id="actionable_tab">
                    <!-- <h4>Add a new Invoice</h4> -->

                    <div class="px-2">

                        <div class="row justify-content-center">
                            <div style="" class="container-fluid text-center p-3 mt-3 mb-2">
                                <div style="z-index:2;" class="container-fluid pl=0">

                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <table class="table table-hover order-column full-width" id="patient_referral" style="width: 100%">
                                            <thead>
                                                <tr>
                                                    <th>Date Recorded</th>
                                                    <th>Patient</th>
                                                    <th>Primary Diagnosis</th>
                                                    <th>Contact Details</th>

                                                    <th>Doctor</th>
                                                    <th>Next Steps</th>
                                                    <th>Action Taken</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody></tbody>
                                        </table>
                                        <input type="hidden" id="mdc_selector">
                                    </div>
                                </div>

                                </div>
                        </div>
                    </div>

                </div>


                <div class="tab-pane" id="snoozed_tab">
                    <!-- border border-left-0 border-right-0 border-bottom-0 border-3 border-primary  -->
                    <div class="card mt-3  card-box">
                        <div class="card-body">
                            <div class="container-fluid py-2 mt-4">

                                <div class="table-responsive mt-2">



                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</div>



<!-- php: =$this->Html->script('../assets/plugins/datatables/jquery.dataTables.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/material-datetimepicker/moment-with-locales.min.js') -->
<!-- php: =$this->Html->script('../assets/plugins/datatables/dataTables.searchBuilder.js') -->
<script>

    function getAge(dateString) {
		var ageInMilliseconds = new Date() - new Date(dateString);
		return Math.floor(ageInMilliseconds/1000/60/60/24/365); // convert to years
	}

    function getDiagnosisType(row) {
		switch (row) {
			case 1:
				color = 'red';
				badge_color = 'danger'
				value = 'Primary';
				break;
			case 2:
				color = 'green';
				badge_color = 'success'
				value = 'Provisional';
				break;
			case 3:
				color = 'orange';
				badge_color = 'warning'
				value = 'Differential';
				break;

			default:
				color = 'grey';
				badge_color = 'secondary'
				value = 'Other';
				break;
		}
		return \`<span class="badge badge-\${badge_color} " style="background:\${color};color: white">\${value}</span>\`;
	}

    function requestReferral() {
        table = $('#patient_referral').DataTable();
        table.destroy();
        $('#patient_referral').DataTable({
            "ordering": false,
            ajax:  {
                url: "<!-- php: = $this->Url->build(['controller' => 'Concierge', 'action' => 'patientReferral',]) -->",
                dataSrc: 'data'
            },
            columns: [
                {
                    data: "date_created",
                    render: function(data, type, row) {
                        return  (row) ? moment(row?.date_created).format('DD/MM/YYYY, hh:mm A') : ''
                    }
                },
                {
                    data: "name",
                    render: function(data, type, row) {
                        gender = row.patient?.gender_id == 1 ?  'Male': 'Female' 
                        age = getAge(row.patient.date_of_birth)
                        return \`\${row?.patient.first_name} \${row?.patient.last_name} <span class="badge badge-primary">\${gender}</span> \${row.patient.date_of_birth == undefined ? '': '<span class="badge badge-success">' + age + ' yrs </span>'}\`
                    }
                },
                {
                    data: "diagnosis",
                    render: function(data, type, row) {
                        result = ''
                        row.patient_visit_diagnoses.forEach(ele => {
                            
                            if (ele?.patient_visit_primary_diagnoses && ele?.patient_visit_primary_diagnoses.length > 0) {
                                ele?.patient_visit_primary_diagnoses?.forEach(primaryDiagnosis => {
                                    result += "<li>"
                                    if (primaryDiagnosis?.primary_diagnosis != undefined) {
                                        result += \`\${primaryDiagnosis?.primary_diagnosis?.name} <span class="badge badge-danger">\${primaryDiagnosis?.primary_diagnosis?.code}</span>
                                        \${getDiagnosisType(1)} \${\`| \${primaryDiagnosis.ill_episode}\`} <i class="fa fa-circle" style="color:\${primaryDiagnosis.is_cleared ? 'green' : 'red'}" aria-hidden="true"></i>\`
                                    } else {
                                        result += 'N/A'
                                    }
                                    result += "</li>"
                                });
                            }
                        });
                        return result
                    }
                },
                {
                    data: "name",
                    render: function(data, type, row) {
                        result = ''
                        
                        return \`\${row.email || ''} \${row.phone || ''}\`
                    }
                },
                {
                    data: "name",
                    render: function(data, type, row) {
                        result = ''

                        queue = row.queue.slice(-1)[0]
                        
                        return (queue) ? \`\${queue?.user?.first_name || ''} \${queue?.user?.last_name || ''}\` : ''
                    }
                },
                {
                    data: "name",
                    render: function(data, type, row) {
                        result = ''
                        
                        return  ""
                    }
                },
                {
                    data: "name",
                    render: function(data, type, row) {
                        result = ''
                        
                        return  ""
                    }
                },
                {
                    data: "name",
                    render: function(data, type, row) {
                        result = ''
                        
                        return  \`
                            <button class="btn btn-xs">Sms Note</button>
                            <button class="btn btn-xs">Email Note</button>
                        \`
                    }
                },
            ]
        });
    };
    

    requestReferral();




    function notify_assignee(id){
        if (!confirm("Confirm Doctor Notification")) {
            return
        }
        $.ajax({
            url:'<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'notifyAssignee']) -->/' + id,
            type:'POST',
            data: $(this).serialize(),
            success: function(res){
                // console.log(res);
                // var data = JSON.parse(res);
                console.log(res);
                // alertify
                alertify.success(res);
                getRoutineCare();
                $("#cancel_routine").modal("hide");
            },
            error: function(err){
                console.log(err);
                alertify.error("Error canceling routine care");
    
            }
        });
    }

  
</script>

`;

export default function ElementElementConciergeReferrals() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
