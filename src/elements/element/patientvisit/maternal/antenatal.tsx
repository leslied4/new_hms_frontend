const rawHtml = `
<div class="col-md-12">
    <div class="card-head legend-head">
        <header>Antenatal</header>
        <div style="float: right;">
            <a id="add_antenatal_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_antenatal_div, #antenatal_list_div, #add_antenatal_button').hide(0);$('#add_antenatal_div, #view_antenatals_button').show({ direction: 'top' }, 3000)">Add Antenatal</a>
            <a id="view_antenatals_button" class="btn btn-sm btn-<!-- php: = $theme2 -->" onclick="$('#no_antenatal_div, #antenatal_list_div, #add_antenatal_button').show({ direction: 'top' }, 3000);$('#add_antenatal_div,#view_antenatals_button').hide(0);" style="display: none;">View Antenatals</a>
        </div>
    </div>

    <div class="card card-box" id="add_antenatal_div" style="display: none;">
        <div class="card-body" id="bar-antenatal_div">
            <!-- php: = $this->Form->create(null, ['id' => 'addAntenatalForm', 'url' => ['controller' => 'Maternal', 'action' => 'addAntenatal', $selectedVisit->patient_id, $selectedVisit->id]]); -->
                <!-- php: = $this->Form->hidden('patient_pregnancy_id', ['value' => $selectedVisit->pregnancy_id]) -->
                <div class="form-body">

                    <div class="form-group row">
                        <label class="control-label col-md-3">
                            Weight (kg)
                        </label>
                        <div class="col-md-7">
                            <input type="number" min="0" name="weight" id="weight" data-required="1" placeholder="Enter weight" class="form-control input-height" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-3">
                        Blood Presure(mmHg)
                        </label>
                        <div class="col-md-7">
                            <input type="text" name="bp" id="bp" data-required="1" placeholder="Enter blood presure" class="form-control input-height" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-3">
                        Urine Protein
                        </label>
                        <div class="col-md-7">
                            <SearchableSelectField class="form-control input-height" data-size="10" name="urine_protein" id="urine_protein" >
                                <option value="">--Select--</option>
                                <option value="-">-</option>
                                <option value="+">+</option>
                                <option value="++">++</option>
                                <option value="+++">+++</option>
                                <option value="Trace">Trace</option>
                                <option value="Not Applicable">Not Applicable</option>
                            </SearchableSelectField>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-3">
                        Urine Sugar
                        </label>
                        <div class="col-md-7">
                            <SearchableSelectField class="form-control input-height" data-size="10" name="urine_sugar" id="urine_sugar" >
                                <option value="">--Select--</option>
                                <option value="-">-</option>
                                <option value="+">+</option>
                                <option value="++">++</option>
                                <option value="+++">+++</option>
                                <option value="Trace">Trace</option>
                                <option value="Not Applicable">Not Applicable</option>
                            </SearchableSelectField>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-3">
                        Gestation Age/Weeks
                        </label>
                        <div class="col-md-7">
                            <input 
                                type="number" min="0" 
                                name="gestation" id="gestation" data-required="1" placeholder="Provide gestation days or weeks" class="form-control input-height" 
                                onchange="showCorticosteroids()"
                            />
                        </div>
                    </div>
                    
                    <div class="form-group row" id="receive_corticosteroids" style="display:none">
                        <label class="control-label col-md-3">
                            Corticosteroids
                        </label>
                        <div class="col-md-7">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="corticosteroids" id="stat_radio" value="No" onchange="showDrugType()" checked>
                                <label class="form-check-label" for="stat_radio"><span class="badge rounded-pill" style="background-color: #0984e3;">No</span></label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="corticosteroids" id="routine_radio" value="Yes" onchange="showDrugType()">
                                <label class="form-check-label" for="routine_radio"><span class="badge rounded-pill" style="background-color: #d63031;">Yes</span></label>
                            </div>
                            <div class="form-check form-check-inline">
                                <label class="form-check-label" for="routine_radio"><span class="" style="">
                                    (Eligible For Corticosteroids at 28 - 34 weeks?)
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row" style="display:none" id="drugType">
                        <label class="control-label col-md-3">Drug Type
                        </label>
                        <div class="col-md-7">
                            <SearchableSelectField class="form-control input-height" name="corticosteroids_type" id="drugTypeSelect">
                                <option value="">Select...</option>
                                <!-- php: $painkillers = [ 'Betamethasone acetate' => 'Betamethasone acetate', 'Betamethasone phospahe' => 'Betamethasone phospahe', 'Dexamethasone' => 'Dexamethasone', 'Prednisolone' => 'Prednisolone', 'Hydrocortisone' => 'Hydrocortisone', 'Predniso... -->
                                <!-- php: foreach($painkillers as $key => $value) { -->
                                    <option <!-- php: = 1==2 ? 'selected="selected"' : '' --> value="<!-- php: = $key -->"><!-- php: = $value --></option>
                                <!-- php: } -->
                            </SearchableSelectField>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-3">
                            Fundal Height (cm)
                        </label>
                        <div class="col-md-7">
                            <input type="number" min="1" name="height" id="height" data-required="1" placeholder="Enter height" class="form-control input-height" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-3">
                        Presentation
                        </label>
                        <div class="col-md-7">
                            <input type="text" name="presentation" id="presentation" data-required="1" placeholder="Enter presentation" class="form-control input-height" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-3">
                        Descent
                        </label>
                        <div class="col-md-7">
                            <SearchableSelectField class="form-control input-height" data-size="10" name="descent" id="descent" >
                                <option value="">--Select--</option>
                                <option value="1/5">1/5</option>
                                <option value="2/5">2/5</option>
                                <option value="3/5">3/5</option>
                                <option value="4/5">4/5</option>
                                <option value="5/5">5/5</option>
                            </SearchableSelectField>
                        </div>
                    </div>    
                    
                    <div class="form-group row">
                        <label class="control-label col-md-3">
                            Fetal Heart Rate (bpm)
                        </label>
                        <div class="col-md-7">
                            <input type="number" min="0" name="heart_rate" id="heart_rate" data-required="1" placeholder="Fetal Heart Rate" class="form-control input-height" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="control-label col-md-3">
                            Iron Folic Acid
                        </label>
                        <div class="col-md-7">
                            <input type="number" min="0" name="iron" id="heart_rate" data-required="1" placeholder="IFA" class="form-control input-height" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="control-label col-md-3">
                        CTG
                        </label>
                        <div class="col-md-7">
                            <SearchableSelectField class="form-control input-height" data-size="10" name="ctg" id="ctg" >
                                <option value="">--Select--</option>
                                <option value="Reassuring">Reassuring</option>
                                <option value="Suspicious">Suspicious</option>
                                <option value="Pathological">Pathological</option>
                            </SearchableSelectField>
                        </div>
                    </div>
                    
                    <div class="form-group row">
                        <label class="control-label col-md-3">
                        IPT
                        </label>
                        <div class="col-md-7">
                            <SearchableSelectField class="form-control input-height" data-size="10" name="ipt" id="ipt_selector" >
                                <option value="">--Select--</option>
                                <option id="ipt-1" value="1">IPT 1</option>
                                <option id="ipt-2" value="2">IPT 2</option>
                                <option id="ipt-3" value="3">IPT 3</option>
                                <option id="ipt-4" value="4">IPT 4</option>
                                <option id="ipt-5" value="5">IPT 5</option>
                                <option id="ipt-6" value="6">Not due yet</option>
                                <option id="ipt-7" value="7">Not given</option>
                            </SearchableSelectField>
                        </div>
                    </div>  
                    <div class="form-group row">
                        <label class="control-label col-md-3">
                        Diagnosis (Clincal Inidication)
                        </label>
                        <div class="col-md-7">
                            <div class="row">

                                <div class="col-md-12">
                                    <SearchableSelectField style="width:100%" data-max-options="1"
                                        data-width="100%"
                                        class="form-control selectpicker show-menu-arrow show-tick"
                                        data-size="4" name="primary_diagnosis_ids[]"
                                        id="primary_diagnosis_id" title="Select Diagnosis"
                                        data-live-search="true" data-style="bg-white"
                                        onchange="diseaseType(this, event)" multiple>
                                    </SearchableSelectField>
                                </div>
                                <div class="col-md-12">
                                    <SearchableSelectField class="form-control input-height selectpicker show-menu-arrow show-tick" data-size="5" title="Select Surgery" name="procedure_ids[]" id="procedure_ids" data-live-search="true" multiple>

                                    </SearchableSelectField>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="control-label col-md-3">
                            Remarks
                        </label>
                        <div class="col-md-7">
                            <textarea type="text" name="remarks" id="remarks" data-required="1" placeholder="Provide comment" class="form-control"></textarea>
                        </div>
                    </div>       

                    <div class="form-group row">
                        <label class="control-label col-md-3">
                            Date of next visit
                        </label>
                        <div class="col-md-7">
                            <div class="input-group date form_date " data-date="" title="Select date of next visit" data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
                                <input class="form-control input-height" placeholder="Select Date" name="date_of_next_visit" id="date_of_next_visit" type="text" value="">
                                <span class="input-group-addon"><span class="fa fa-calendar"></span></span>
                            </div>
                            <input type="hidden" id="dtp_input2" value="" />
                        </div>
                    </div>

                    <input type="hidden" id="hidden" name="request_type" value="new_maternal_care_mother_antenatal">

                    <div class="row">
                        <div class="offset-md-3 col-md-8">
                            <button type="submit" class="btn bg-blue btn-labeled ml-auto"><b><i class="icon-paperplane"></i></b>Save</button>
                        </div>
                    </div>

                </div>                               
            <!-- php: =$this->Form->end(); -->
        </div>
    </div>

    <!-- php: if(!isset($antenatalList) || $antenatalList == null) { -->
        <div class="card card-box" id="no_antenatal_div">
            <div class="card-body no-padding height-9">
                <h3 style="text-align: center; margin-bottom: 100px; margin-top: 100px">No antenatal recorded</h3>
            </div>
        </div>
    <!-- php: } else { -->
        <div class="card-body" id="antenatal_list_div">
            <div class="table-scrollable">        
                <table class="table table-hover order-column full-width" id="maternal_antenatal_table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Weight</th>
                            <th>BP</th>
                            <th>Urine Protein</th>
                            <th>Urine Sugar</th>
                            <th>Gestational Age of Delivery</th>
                            <th>Corticosteroids</th>
                            <th>Fundal Height</th>
                            <th>Presentation</th>
                            <th>Descent</th>
                            <th>Fetal Heart Rate</th>
                            <th>IFA</th>
                            <th>CTG</th>
                            <th>IPT</th>
                            <th>Remarks</th>
                            <th>Next</th>
                        </tr>
                    </thead>

                </table>                                                                                                
            </div>

        </div>
    <!-- php: } -->
</div>
<script>
        var ipt_count = $("#ipt_counter").val();
        switch(ipt_count)
        {
            case('1'):
            $("#ipt-1").attr("hidden", "hidden");
            break;
            case('2'):
            $("#ipt-1").attr("hidden", "hidden");
            $("#ipt-2").attr("hidden", "hidden");
            break;
            case('3'):
            $("#ipt-1").attr("hidden", "hidden");
            $("#ipt-2").attr("hidden", "hidden");
            $("#ipt-3").attr("hidden", "hidden");
            break;
            case('4'):
            $("#ipt-1").attr("hidden", "hidden");
            $("#ipt-2").attr("hidden", "hidden");
            $("#ipt-3").attr("hidden", "hidden");
            $("#ipt-4").attr("hidden", "hidden");
            break;
            case('5'):
            $("#ipt-1").attr("hidden", "hidden");
            $("#ipt-2").attr("hidden", "hidden");
            $("#ipt-3").attr("hidden", "hidden");
            $("#ipt-4").attr("hidden", "hidden");
            $("#ipt-5").attr("hidden", "hidden");   
            default:  
        }
</script>
<script>
    function showDrugType() {
        result = $("input[type='radio'][name=corticosteroids]:checked").val();
        if (result == 'Yes') {
            $("#drugType").show()
            $("#drugTypeSelect").attr('required', true);
        }else{
            $("#drugType").hide()
            $('#drugTypeSelect').val('')
            $("#drugTypeSelect").attr('required', false);
        }
    }
    function showCorticosteroids() {
        if (['28','29','30','31','32','33','34'].includes($('#gestation').val())) {
            return $('#receive_corticosteroids').show()
        }
        $('#receive_corticosteroids').hide()
    }
</script>
<!-- php: =$this->Html->script('../assets/plugins/bootstrap-select/js/bootstrap-select.min.js') -->

<script>
    const antenatalContinuousCare = '<!-- php: = $continuousCare -->';
    const maternalMotherAntenatals_link = '<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'maternalMotherAntenatals', $selectedVisit->patient_id, $selectedVisit->id]) -->'
    const populateStandardDiagnosis_link = "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getStandardDiagnosis']) -->"
    const antenatalGetAllProcedures_surgery_link = \`<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'getAllProcedures']) -->\`
</script>

<script>
    function antenatalMaternalTableGenerator() {
        table = $('#maternal_antenatal_table').DataTable();
        table.destroy();
        $('#maternal_antenatal_table').DataTable({
            "ordering": false,
            "processing": antenatalContinuousCare,
            "serverSide": antenatalContinuousCare,
            ajax:  {
                url: maternalMotherAntenatals_link,
                dataSrc: 'data'
            },
            columns: [
                {
                    data: "",
                    render: function(data, type, row) {
                        return moment(row.date_added).format('DD/MM/YYYY, hh:mm A')
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.weight 
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.bp 
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.urine_protein 
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.urine_sugar 
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.gestation 
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return \`\${row.corticosteroids} \${row.corticosteroids == 'Yes' ? '('+ row.corticosteroids_type + ')' : '' }\`
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.height
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.presentation
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.descent
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.heart_rate
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.iron
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.ctg
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return ''
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return row.remarks
                    }
                },
                {
                    data: "",
                    render: function(data, type, row) {
                        return \`<span class="badge badge-primary">\${ row.date_of_next_visit != null ? moment(row.date_of_next_visit).format("DD/MM/YYYY") : '' }</span>\`
                    }
                },
            ]
        });
    };

    function populateStandardDiagnosis() {
		$.ajax({
			type: "GET",
			url: populateStandardDiagnosis_link,
			success: function g(data, textStatus) {
				result = ''
				if (Array.isArray(data) && data && data.length > 0) {
					data?.forEach((element, index) => {
						result += \`
								<option title="\${element.code}" value="\${element.id}" data-content="\${element.name}   <span class='badge badge-danger'>\${element.code}</span>">\${element.name}</option>
								\`
					});
				}
				$('#primary_diagnosis_id').html(result)
				$("#primary_diagnosis_id").selectpicker("refresh");
			},
			fail: function g(xhr, textStatus, errorThrown) {
			}
		});
	}

    function getProcedures() {
		$.ajax({
			type: "GET",
			url: antenatalGetAllProcedures_surgery_link,
			success: function g(data, textStatus) {
				let procedure_data = "";
				if(Array.isArray(data)) {
					data?.forEach(element => {
						procedure_data += (\`<option data-content="\${element.name} <span class='badge badge-primary'>\${element.price}</span> <span class='badge badge-danger'>\${element?.insurance_profile_procedure_price?.price || 0}</span>" value="\${element.id}" >\${element.name} (Price => \${element.price})</option>\`)
					});
				}
				$('#procedure_ids').html(procedure_data);
				$('#procedure_ids').selectpicker("refresh");

			},
			fail: function g(xhr, textStatus, errorThrown) {
				alertify.error('Error Occured. Please try again');
					// console.log(xhr);
			}
		});
    }
</script>
`;

export default function ElementElementPatientvisitMaternalAntenatal() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
