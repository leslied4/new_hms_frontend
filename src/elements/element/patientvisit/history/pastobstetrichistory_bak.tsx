const rawHtml = `
<!-- php: $value = isset($patient->patient_history_obstetrics) && sizeof($patient->patient_history_obstetrics) > 0 ? $patient->patient_history_obstetrics[0] : null; $obstetric = $value; $patientHistoryPregnancies = $patient->patient_history_pregnanci... -->

<div class="row">
	<div class="col-md-12 col-sm-12">								
		<div id="app">
			<div class="table-container">
				
				<edit-modal :show="showModal"></edit-modal>
				
				<modal v-if="showEditPregnancyModal" @close="showEditPregnancyModal = false"></modal>

				<list-pregnancies></list-pregnancies>

				<add-pregnancy></add-pregnancy>

			</div>

			<div class="table-container">
			
				<view-obstetric-history></view-obstetric-history>

			</div>
		</div>
	</div>	
</div>

<br/>

<hr/>

<!-- php: =$this->Html->script('../assets/js/vue.js') -->
<!-- php: =$this->Html->script('../assets/js/axios.min.js') -->

<!-- template for the modal component -->
<script type="x/template" id="modal-template">
    <!-- div name="modal">
        <h3>Edit Previous Pregnancy</h3>
    </div -->
	
	<transition name="modal">
		
		<div class="modal-mask" v-show="show" transition="modal" aria-hidden="true" role="dialog" aria-labelledby="modalTitle" aria-describedBy="modalDescription" style="border: 2px solid black;">
        <!-- div class="modal-mask" @click="close" v-show="show" -->
            <div class="modal-container" @click.stop>
				<h3>Edit Previous Pregnancy</h3>
              	<slot></slot>
            </div>
        </div>
    </transition>
	
	<!-- div class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<slot></slot>
				</div>
				<button class="close" type="button" data-dismiss="modal" @click="$emit('close')"></button>
			</div>
		</div>
	</div -->
</script>

<script type="text/x-template" id="viewObstetricHistory">
	<div>
		<div style="float: left">
			<h4>Obstetric History</h4>
		</div>
		<div style="float: right">

			<p align="left">
				<button v-if="!editMode" style="margin-top: 12px" @click="editMode = true" class="btn btn-primary btn-xs">
					Update Obstetric History
				</button>
				
				<a v-if="editMode" style="margin-top: 12px" @click="saveObstetric" class="btn btn-success btn-xs">
					Save Obstetric History
				</a>
				
				<a v-if="editMode" style="margin-top: 12px" @click="editMode = false" class="btn btn-default btn-xs">
					Cancel
				</a>
			</p>			
		</div>

		<div style="clear: both"></div>

		<ul class="list-group list-group-unbordered">
			<li class="list-group-item">
				&nbsp;&nbsp;<b>Date of last menstrual period</b> 
				<a v-if="!editMode" class="pull-right">{{ obstetric.date_of_last_menstrual_period != "" ? obstetric.date_of_last_menstrual_period : "N/A" }}&nbsp;&nbsp;</a>
				<!-- div v-if="editMode" class="pull-right"><input v-model="obstetric.date_of_last_menstrual_period" />&nbsp;&nbsp;</div -->
				
				<div v-if="editMode" style="width: 250px" class="input-group input-group-sm date form_date pull-right" data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="yyyy-mm-d" data-link-field="dtp_input10" data-link-format="yyyy-mm-dd">
					<input class="form-control" size="16" v-model="obstetric.date_of_last_menstrual_period" placeholder="Enter date of last menstrual period" data-required="0" name = "date_of_last_menstrual_period" id = "date_of_last_menstrual_period_update" type="text"  >
					<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
				</div>
				<input v-if="editMode" type="hidden" id="dtp_input10" value="" />
			</li>
			<li class="list-group-item">
				&nbsp;&nbsp;<b>Date of positive pregnancy test</b> 
				<a v-if="!editMode" class="pull-right">{{ obstetric.date_of_positive_pregnancy_test != "" ? obstetric.date_of_positive_pregnancy_test : "N/A" }}&nbsp;&nbsp;</a>
				<div v-if="editMode" style="width: 250px" class="input-group input-group-sm date form_date pull-right" data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="yyyy-mm-d" data-link-field="dtp_input30" data-link-format="yyyy-mm-dd">
					<input class="form-control" size="16" v-model="obstetric.date_of_positive_pregnancy_test" placeholder="Enter date of positive pregnancy test" data-required="0" name = "date_of_positive_pregnancy_test" id = "date_of_positive_pregnancy_test_update" type="text" >
					<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
				</div>
				<input v-if="editMode" type="hidden" id="dtp_input30" value="" />
			</li>
			<li class="list-group-item">
				&nbsp;&nbsp;<b>Confirmatory Ultrasound Scan</b> 
				<a v-if="!editMode" class="pull-right">{{ obstetric.confirmatory_ultrasound_scan != "" ? obstetric.confirmatory_ultrasound_scan : "N/A" }}&nbsp;&nbsp;</a> 													
				<SearchableSelectField v-if="editMode" style="width: 250px" class="form-control pull-right" v-model="confirmatory_ultrasound_scan" name="confirmatory_ultrasound_scan" id="confirmatory_ultrasound_scan_update" >
					<option>Select</option>
					<option value="Yes">Yes</option>
					<option value="No">No</option>
				</SearchableSelectField>
			</li>
			<li class="list-group-item">
				&nbsp;&nbsp;<b>Date of scan</b> 
				<a v-if="!editMode" class="pull-right">{{ obstetric.date_of_scan != "" ? obstetric.date_of_scan : "N/A" }}&nbsp;&nbsp;</a>
				<div v-if="editMode" style="width: 250px" class="input-group input-group-sm date form_date pull-right" data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="yyyy-mm-d" data-link-field="dtp_input40" data-link-format="yyyy-mm-dd">
					<input class="form-control" size="16" v-model="obstetric.date_of_scan" placeholder="Enter date of scan" data-required="0" name = "date_of_scan" id = "date_of_scan_update" type="text" >
					<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
				</div>
				<input v-if="editMode" type="hidden" id="dtp_input40" value="" />
			</li>
			<li class="list-group-item">
				&nbsp;&nbsp;<b>Gestational Age</b> 
				<a v-if="!editMode" class="pull-right">{{ obstetric.gestational_age != "" ? obstetric.gestational_age : "N/A" }}&nbsp;&nbsp;</a>
				<input v-if="editMode" type="text" style="width: 250px" name="gestational_age" v-model="gestational_age" data-required="0" placeholder="Enter gestational age" class="form-control pull-right" />
			</li>
			<li class="list-group-item">
				&nbsp;&nbsp;<b>EDD</b> 
				<a v-if="!editMode" class="pull-right">{{ obstetric.edd != "" ? obstetric.edd : "N/A" }}&nbsp;&nbsp;</a>
				<input v-if="editMode" type="text" style="width: 250px" v-model="edd" name="edd" data-required="0" placeholder="Enter EDD" class="form-control pull-right" />
			</li>
		</ul>
	</div>
</script>

<script type="text/x-template" id="listPregnancies">
	<div>
		<div style="float: left">
			<h4>Pregnancy History</h4>
		</div>

		<!-- input type='button' @click='allRecords()' value='Load All Pregnancies' -->		

		<div style="clear: both"></div>

		<div class="table-scrollable">
			<table class="table table-hover table-checkable order-column full-width" id="pregnancy_table">
				<thead>
					<tr>
						<th scope="col">No</th>
						<th scope="col">Date</th>
						<th scope="col">Conception Mode</th>
						<th scope="col">Delivery Mode</th>
						<th scope="col">Outcome</th>
						<th scope="col">Complications</th>
						<th scope="col">Sex</th>
						<th scope="col">Weight (KG)</th>
						<th scope="col" class="actions"><!-- php: = __('Actions') --></th>
					</tr>
				</thead>
				<tbody>

					<tr v-for='value, key in oldPregnancies'>
						<td>{{ ++key }}</td>
						<td>{{ value.date_conceived }}</td>
						<td>{{ value.mode_of_conception }}</td>
						<td>{{ value.mode_of_delivery }}</td>
						<td>{{ value.outcome }}</td>
						<td>{{ value.pregnancy_complications }}</td>
						<td>{{ value.gender.name }}</td>
						<td>{{ value.weight }}</td>
						<td>
							<button id="show-modal" @click="showEdit(value.id)" class="btn btn-default btn-xs">Edit</button>
							<!-- a data-toggle="modal" data-target="#editPastPregnancyHistoryDialogue_{{ value.gender.id }}" href="javascript:" class="btn btn-default btn-xs">
								Edit
							</a -->
						</td>
					</tr>

				</tbody>
			</table>
		</div>
	</div>
</script>

<script type="text/x-template" id="addPregnancy">
	<div class="card-body" id="bar-parent">
	
		<a v-on:click="isHidden = !isHidden" style="margin-top: 12px; float: right;" href="javascript:" class="btn btn-primary btn-xs">
			Add Pregnancy History
		</a>
		
		<div style="clear: both"></div>
		
		<div class="form-body" v-if="!isHidden">
			<form id="previousPregnancyForm">
				<div class="form-group row">
					<div class="col-md-3">
						<div class="input-group date form_date input-group-sm" data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="yyyy-mm-dd" data-link-field="dtp_input25" data-link-format="yyyy-mm-dd">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Delivery </span>
							</span>
							<input class="form-control" size="16" placeholder="yyyy-mm-dd" data-required="0" v-model= "date_of_delivery" id="date_of_delivery" name="date_of_delivery" type="text"  >
							<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
						</div>
						<input type="hidden" id="dtp_input25" value="" />
					</div>

					<div class="col-md-3">
						<div class="input-group input-group-sm">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Conception Yr</span>
							</span>
							<input class="form-control" min="1000" max="9999" placeholder="yyyy" data-required="0" v-model= "year_conceived" id = "year_conceived" name="year_conceived" type="number">
						</div>
					</div>

					<div class="col-md-3">
						<div class="input-group input-group-sm">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Conception MD</span>
							</span>
							<SearchableSelectField class="form-control" v-model="mode_of_conception" name="mode_of_conception" id="mode_of_conception" >
								<option>Select</option>
								<option value="Assisted">Assisted</option>
								<option value="Natural">Natural</option>
							</SearchableSelectField>
						</div>
					</div>

					<div class="col-md-3">
						<div class="input-group input-group-sm">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Birth Place</span>
							</span>
							<input class="form-control" placeholder="Place" data-required="0" v-model="place_of_birth" id="place_of_birth" name="place_of_birth">
						</div>
					</div>		
				</div>

				<div class="form-group row">
					<div class="col-md-3">
						<div class="input-group input-group-sm">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Gestation Age</span>
							</span>
							<input class="form-control" min="1" placeholder="Gest. at Birth" data-required="0" v-model="gestation_age_at_birth" id="gestation_age_at_birth" name="gestation_age_at_birth" type="number">
						</div>
					</div>				

					<div class="col-md-3">
						<div class="input-group input-group-sm">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Delivery</span>
							</span>
							<SearchableSelectField class="form-control" v-model="mode_of_delivery" id="mode_of_delivery_add" name="mode_of_delivery" >
								<option value="">Select Mode</option>
								<option value="Assisted">Assisted</option>
								<option value="Natural">Natural</option>
							</SearchableSelectField>
						</div>
					</div>				

					<div class="col-md-3">
						<div class="input-group input-group-sm">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Outcome</span>
							</span>
							<SearchableSelectField class="form-control" v-model="outcome" id="outcome_add" name="outcome" >
								<option value="">Select Outcome</option> 
								<option value="Live Birth">Live Birth</option>
								<option value="Miscarriage">Miscarriage</option>
								<option value="Still Birth">Still Birth</option>
								<option value="Termination">Termination</option>
							</SearchableSelectField>
						</div>
					</div>

					<div class="col-md-3">
						<div class="input-group input-group-sm">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Labour Compl.</span>
							</span>
							<input class="form-control" placeholder="Place" data-required="0" v-model="labour_complications" id="labour_complications" name="labour_complications">
						</div>
					</div>
				</div>

				<div class="form-group row">

					<div class="col-md-3">
						<div class="input-group input-group-sm">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Gender</span>
							</span>
							<SearchableSelectField class="form-control" v-model="gender_id" id="gender_id" name="gender_id" >
								<option value="">Select...</option>
								<!-- php: foreach($genders as $gender) { -->
										<option value="<!-- php: = $gender->id -->"><!-- php: = $gender->name --></option>
									<!-- php: } -->
							</SearchableSelectField>
						</div>
					</div>

					<div class="col-md-3">
						<div class="input-group input-group-sm">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Weight</span>
							</span>
							<input type="number" min="0.1" step="0.1" v-model="weight" name="weight" data-required="0" placeholder="KG" class="form-control" />
						</div>
					</div>

					<div class="col-md-3">
						<div class="input-group input-group-sm">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Breastfeeding </span>
							</span>
							<input type="number" min="1" step="1" v-model="duration_of_breastfeeding" name="duration_of_breastfeeding" data-required="0" placeholder="Weeks" class="form-control" />
						</div>
					</div>

					<div class="col-md-3">
						<div class="input-group input-group-sm">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Breastfeeding Ex.</span>
							</span>
							<input type="number" min="1" step="1" v-model="duration_of_exclusive_breastfeeding" name="duration_of_exclusive_breastfeeding" data-required="0" placeholder="Weeks" class="form-control" />
						</div>
					</div>
				</div>

				<div class="form-group row">
					<div class="col-md-3">
						<div class="input-group input-group-sm">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Preg. Problems</span>
							</span>
							<input class="form-control" placeholder="Place" data-required="0" v-model="pregnancy_complications" id="pregnancy_complications" name="pregnancy_complications">
						</div>
					</div>
					
					<div class="col-md-3">
						<div class="input-group input-group-sm">
							<span class="input-group-btn outer-label">
								<span class="btn btn-default inner-label">Conditions</span>
							</span>
							<input class="form-control" placeholder="Health" data-required="0" v-model="child_info" id="child_info" name="child_info">
						</div>
					</div>
				</div>

				<div class="form-actions">
					<div class="row">
						<div class="col-md-12">
							<button @click.prevent="resetForm" class="btn btn-info" style="float: right; margin-left: 15px;">Reset</button>

							<button @click.prevent="savePregnancy" class="btn btn-info" style="float: right">Submit</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</script>

<script type="text/x-template" id="editModal">
	<div class="modal-mask" v-show="show" transition="modal" aria-hidden="true" role="dialog" aria-labelledby="modalTitle" aria-describedBy="modalDescription" style="border: 2px solid black;">
		<div class="modal-container">
			<h4>
				Edit Pregnancy
				<button @click.prevent="setModalClose" style="float: right" class="btn btn-xs btn-danger">Close</button>
			</h4>
			<hr/>
			<div class="form-body">
				<form id="previousPregnancyForm">
					<div class="row">
						<label class="col-md-4 edit-dialog-label">Delivery Date</label>
						<div class="col-md-8 edit-dialog-control">
							<div class="input-group date form_date input-group-sm" data-date="" data-date-enddate="<!-- php: = date("Y-m-d") -->" data-date-format="yyyy-mm-dd" data-link-field="dtp_input15" data-link-format="yyyy-mm-dd">
								
								<input class="form-control" size="16" placeholder="yyyy-mm-dd" data-required="0" v-model= "pregnancy.date_of_delivery" id="date_of_delivery_edit" name="date_of_delivery" type="text"  >
								<span class="input-group-addon"><span class="fa fa-calendar"></span></span>
							</div>
							<input type="hidden" id="dtp_input15" value="" />
						</div>
					</div>

					<div class="row">
						<label class="col-md-4 edit-dialog-label">Year of Conception</label>
						<div class="col-md-8 edit-dialog-control">
							<div class="input-group input-group-sm">
								<input class="form-control" min="1000" max="9999" placeholder="yyyy" data-required="0" v-model= "pregnancy.year_conceived" id = "year_conceived_edit" name="year_conceived" type="number">
							</div>
						</div>
					</div>

					<div class="row">
						<label class="col-md-4 edit-dialog-label">Mode of Conception</label>
						<div class="col-md-8 edit-dialog-control">
							<div class="input-group input-group-sm">
								<SearchableSelectField class="form-control" v-model="pregnancy.mode_of_conception" name="mode_of_conception" id="mode_of_conception_edit" >
									<option>Select</option>
									<option value="Assisted">Assisted</option>
									<option value="Natural">Natural</option>
								</SearchableSelectField>
							</div>
						</div>
					</div>

					<div class="row">
						<label class="col-md-4 edit-dialog-label">Place of Birth</label>
						<div class="col-md-8 edit-dialog-control">
							<div class="input-group input-group-sm">
								<input class="form-control" placeholder="Place" data-required="0" v-model="pregnancy.place_of_birth" id="place_of_birth_edit" name="place_of_birth">
							</div>
						</div>		
					</div>

					<div class="row">
						<label class="col-md-4 edit-dialog-label">Gestational Age</label>
						<div class="col-md-8 edit-dialog-control">
							<div class="input-group input-group-sm">
								<input class="form-control" min="1" placeholder="Gest. at Birth" data-required="0" v-model="pregnancy.gestation_age_at_birth" id="gestation_age_at_birth_edit" name="gestation_age_at_birth" type="number">
							</div>
						</div>				
					</div>				

					<div class="row">
						<label class="col-md-4 edit-dialog-label">Mode of Delivery</label>
						<div class="col-md-8 edit-dialog-control">
							<div class="input-group input-group-sm">
								<SearchableSelectField class="form-control" v-model="pregnancy.mode_of_delivery" id="mode_of_delivery_edit" name="mode_of_delivery" >
									<option value="">Select Mode</option>
									<option value="Assisted">Assisted</option>
									<option value="Natural">Natural</option>
								</SearchableSelectField>
							</div>
						</div>				
					</div>				

					<div class="row">
						<label class="col-md-4 edit-dialog-label">Outcome</label>
						<div class="col-md-8 edit-dialog-control">
							<div class="input-group input-group-sm">
								<SearchableSelectField class="form-control" v-model="pregnancy.outcome" id="outcome_edit" name="outcome" >
									<option value="">Select Outcome</option> 
									<option value="Live Birth">Live Birth</option>
									<option value="Miscarriage">Miscarriage</option>
									<option value="Still Birth">Still Birth</option>
									<option value="Termination">Termination</option>
								</SearchableSelectField>
							</div>
						</div>
					</div>

					<div class="row">
						<label class="col-md-4 edit-dialog-label">Labour Complications</label>
						<div class="col-md-8 edit-dialog-control">
							<div class="input-group input-group-sm">
								<input class="form-control" placeholder="Place" data-required="0" v-model="pregnancy.labour_complications" id="labour_complications_edot" name="labour_complications">
							</div>
						</div>
					</div>

					<div class="row">
						<label class="col-md-4 edit-dialog-label">Gender</label>
						<div class="col-md-8 edit-dialog-control">
							<div class="input-group input-group-sm">
								<SearchableSelectField class="form-control" v-model="pregnancy.gender_id" id="gender_id_edit" name="gender_id" >
									<option value="">Select...</option>
									<!-- php: foreach($genders as $gender) { -->
											<option value="<!-- php: = $gender->id -->"><!-- php: = $gender->name --></option>
										<!-- php: } -->
								</SearchableSelectField>
							</div>
						</div>
					</div>

					<div class="row">
						<label class="col-md-4 edit-dialog-label">Weight</label>
						<div class="col-md-8 edit-dialog-conrol">
							<div class="input-group input-group-sm">
								<input type="number" min="0.1" step="0.1" v-model="pregnancy.weight" name="weight" id="weight_edit" data-required="0" placeholder="KG" class="form-control" />
							</div>
						</div>
					</div>

					<div class="row">
						<label class="col-md-4 edit-dialog-label">Breastfeeding Duration</label>
						<div class="col-md-8 edit-dialog-control">
							<div class="input-group input-group-sm">
								<input type="number" min="1" step="1" v-model="pregnancy.duration_of_breastfeeding" name="duration_of_breastfeeding" id="duration_of_breastfeeding" data-required="0" placeholder="Weeks" class="form-control" />
							</div>
						</div>
					</div>

					<div class="row">
						<label class="col-md-4 edit-dialog-label">Breastfeeding Duration Ex</label>
						<div class="col-md-8 edit-dialog-conrol">
							<div class="input-group input-group-sm">
								<input type="number" min="1" step="1" v-model="pregnancy.duration_of_exclusive_breastfeeding" name="duration_of_exclusive_breastfeeding" id="duration_of_exclusive_breastfeeding_edit" data-required="0" placeholder="Weeks" class="form-control" />
							</div>
						</div>
					</div>

					<div class="row">
						<label class="col-md-4 edit-dialog-label">Prob. during Preg</label>
						<div class="col-md-8 edit-dialog-control">
							<div class="input-group input-group-sm">
								<input class="form-control" placeholder="Place" data-required="0" v-model="pregnancy.pregnancy_complications" id="pregnancy_complications_edit" name="pregnancy_complications">
							</div>
						</div>
					</div>
					
					<div class="row">
						<label class="col-md-4 edit-dialog-label">Present Condition</label>
						<div class="col-md-8 edit-dialog-control">
							<div class="input-group input-group-sm">
								<input class="form-control" placeholder="Health" data-required="0" v-model="pregnancy.child_info" id="child_info_edit" name="child_info">
							</div>
						</div>
					</div>

					<div class="form-actions">
						<div class="row">
							<div class="col-md-12">
								<button @click.prevent="setModalClose" class="btn btn-info" style="float: right; margin-left: 15px;">Close</button>

								<button @click.prevent="updatePregnancy" class="btn btn-info" style="float: right">Submit</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</script>

<script>
	Vue.component('Modal', {
		template: '#modal-template',
		props: ['show'],
		
		methods: {
			close: function () {
				this.$emit('close');
			}
		},
		
		mounted: function () {
			document.addEventListener("keydown", (e) => {
				if (this.show && e.keyCode == 27) {
					this.close();
				}
			});
		}
	});
	exit;
	// Add pregnancy content
	Vue.component('add-pregnancy', {
		template: '#addPregnancy',
		data: function()  {
			return {
				isHidden: true,
				date_conceived: "",
				date_of_delivery: "",
				place_of_birth: "",
				gestation_age_at_birth: "",
				labour_complications: "",
				year_conceived: "",
				mode_of_conception: "",
				mode_of_delivery: "",
				outcome: "",
				pregnancy_complications: "",
				gender_id: "",
				weight: "",
				child_info: "",
				duration_of_breastfeeding: "",
				duration_of_exclusive_breastfeeding: ""
			}
		},
		methods: {
			resetForm: function() {
				this.date_conceived = "";
				this.date_of_delivery = "";
				this.place_of_birth = "";
				this.gestation_age_at_birth = "";
				this.labour_complications = "";
				this.year_conceived = "";
				this.mode_of_conception = "";
				this.mode_of_delivery = "";
				this.outcome = "";
				this.pregnancy_complications = "";
				this.gender_id = "";
				this.weight = "";
				this.child_info = "";
				this.duration_of_breastfeeding = "";
				this.duration_of_exclusive_breastfeeding = "";
				
				$('#outcome_add').closest('.input-group').removeClass('has-success').removeClass('has-vue-error');
				$('#mode_of_delivery_add').closest('.input-group').removeClass('has-success').removeClass('has-vue-error');
			},
			
			validate: function(){
				valid = true;
				if(!this.outcome) {
					$('#outcome_add').closest('.input-group').removeClass('has-success').addClass('has-vue-error');
					alertify.error("Please select outcome");
					valid = false;
				}
				else {
					$('#outcome_add').closest('.input-group').removeClass('has-success').removeClass('has-vue-error');
				}
				
				if(!this.mode_of_delivery) {
					$('#mode_of_delivery_add').closest('.input-group').removeClass('has-success').addClass('has-vue-error');
					alertify.error("Please select delivery mode");
					valid = false;
				}
				else {
					$('#mode_of_delivery_add').closest('.input-group').removeClass('has-success').removeClass('has-vue-error');
				}
				
				return valid;
			},
			
			savePregnancy: function(){
				console.log("Adding Previous Pregnancy")

				if(!this.validate()) {
					alertify.error("Please fill all required fields and try again");
					return;
				}
				
				let formData = new FormData();
				formData.append('date_conceived', this.date_conceived)
				formData.append('date_of_delivery', this.date_of_delivery)
				formData.append('place_of_birth', this.place_of_birth)
				formData.append('gestation_age_at_birth', this.gestation_age_at_birth)
				formData.append('labour_complications', this.labour_complications)
				formData.append('year_conceived', this.year_conceived)
				formData.append('mode_of_conception', this.mode_of_conception)
				formData.append('mode_of_delivery', this.mode_of_delivery)
				formData.append('outcome', this.outcome)
				formData.append('pregnancy_complications', this.pregnancy_complications)
				formData.append('gender_id', this.gender_id)
				formData.append('weight', this.weight)
				formData.append('child_info', this.child_info)
				formData.append('duration_of_breastfeeding', this.duration_of_breastfeeding)
				formData.append('duration_of_exclusive_breastfeeding', this.duration_of_exclusive_breastfeeding)

				var pregnancy = {};
				formData.forEach(function(value, key){
					pregnancy[key] = value;
				});

				axios({
					method: 'post',
					url: '<!-- php: = $this->Url->build(['controller' => 'History', 'action' => 'addPastPregnancy', $patient->id, ]) -->',
					data: formData,
					config: { headers: {'Content-Type': 'multipart/form-data' }}
				})
				.then(response => {
					//handle success
					console.log(response);
					this.isHidden = true;
					this.resetForm();
					this.$root.$emit('updatePreviousPregnancies', '1');
					alertify.success("Successfully saved pregnancy");
				})
				.catch(response => {
					//handle error
					console.log(response)
					alertify.error("Error occurred saving pregnancy");
				});
				
			},
		}
	});

	// Add pregnancy content
	Vue.component('view-obstetric-history', {
		template: '#viewObstetricHistory',
		data: function()  {
			return {
				editMode: false,
				obstetric: {
					id: "",
					date_of_last_menstrual_period: "N/A",
					date_of_positive_pregnancy_test: "N/A",
					confirmatory_ultrasound_scan: "N/A",
					date_of_scan: "N/A",
					gestational_age: "N/A",
					edd: ""
				}
			}
		},
		
		mounted: function() {
			this.obstetric.date_of_last_menstrual_period = '<!-- php: = $obstetric->date_of_last_menstrual_period != null ? $obstetric->date_of_last_menstrual_period->i18nFormat('yyyy-MM-dd') : "" -->';
			this.obstetric.date_of_positive_pregnancy_test = '<!-- php: = $obstetric->date_of_positive_pregnancy_test != null ? $obstetric->date_of_positive_pregnancy_test->i18nFormat('yyyy-MM-dd') : "" -->';
			this.obstetric.confirmatory_ultrasound_scan = '<!-- php: = $obstetric->confirmatory_ultrasound_scan != null ? $obstetric->confirmatory_ultrasound_scan : "" -->';
			this.obstetric.date_of_scan = '<!-- php: = $obstetric->date_of_scan != null ? $obstetric->date_of_scan->i18nFormat('yyyy-MM-dd') : "" -->';
			this.obstetric.gestational_age = '<!-- php: = $obstetric->gestational_age != null ? $obstetric->gestational_age : "" -->';
			this.obstetric.edd = '<!-- php: = $obstetric->edd != null ? $obstetric->edd : "" -->';
			this.obstetric.id = '<!-- php: = $obstetric->id != null ? $obstetric->id : "" -->';
		},
		
		methods: {
			validate: function(){
				valid = true;
				
				return valid;
			},
			
			saveObstetric: function(){
				console.log("Updating obstetric history")

				if(!this.validate()) {
					alertify.error("Please fill all required fields and try again");
					return;
				}
				
				let formData = new FormData();
				formData.append('date_of_last_menstrual_period', this.date_of_last_menstrual_period)
				formData.append('date_of_positive_pregnancy_test', this.date_of_positive_pregnancy_test)
				formData.append('confirmatory_ultrasound_scan', this.confirmatory_ultrasound_scan)
				formData.append('date_of_scan', this.date_of_scan)
				formData.append('gestational_age', this.gestational_age)
				formData.append('edd', this.edd)
				
				axios({
					method: 'post',
					url: this.obstetric.id == "" ? 
								'<!-- php: = $this->Url->build(['controller' => 'History', 'action' => 'addPastObstetric', $patient->id, ]) -->'
								:
								'<!-- php: = $this->Url->build(['controller' => 'History', 'action' => 'editPastObstetric']) -->/' + this.obstetric.id + ".json",
					data: formData,
					config: { headers: {'Content-Type': 'multipart/form-data' }}
				})
				.then(response => {
					//handle success
					console.log(response);
					this.isHidden = true;
					this.resetForm();
					this.editMode = false;
					alertify.success("Successfully updated obstetric history");
				})
				.catch(response => {
					//handle error
					console.log(response)
					alertify.error("Error occurred updatingn obstetric history");
				});
				
			},
		}
	});

	// List pregnancy content
	Vue.component('list-pregnancies', {
		template: '#listPregnancies',
		data: function() {
    		return {
				oldPregnancies: []
			}
 	 	},
		mounted: function() {
			this.$root.$on('updatePreviousPregnancies', (text) => { // here you need to use the arrow function
				console.log("Updating the previous pregnancies");
				this.allRecords();
			});
			
			axios.get('<!-- php: = $this->Url->build(['controller' => 'History', 'action' => 'getPastPregnancies', $patient->id, ]) -->')
				.then(response => {
					this.oldPregnancies = response.data;
				})
				.catch(error => {
					console.log(error);
				})
		},
		methods: {
			allRecords: function(){
				axios.get('<!-- php: = $this->Url->build(['controller' => 'History', 'action' => 'getPastPregnancies', $patient->id, ]) -->')
				.then(response => {
					this.oldPregnancies = response.data;
				})
				.catch(error => {
					console.log(error);
				})
				
			},
			
			showEdit: function(id){
				// this.showEditPregnancyModal = true;
				this.$root.$emit('showEditPregnancyDialog', id);
			}
		}
	});

	// global component
	Vue.component("edit-modal", {
		template: "#editModal",
		props: {
			active: "active",
			isActive: "isActive",
			show: {
				type: Boolean,
				required: true,
				twoWay: true
			}
		},
		data: function() {
			return {
				pregnancy: {
					id: "",
					date_conceived: "",
					date_of_delivery: "",
					place_of_birth: "",
					gestation_age_at_birth: "",
					labour_complications: "",
					year_conceived: "",
					mode_of_conception: "",
					mode_of_delivery: "",
					outcome: "",
					pregnancy_complications: "",
					gender_id: "",
					weight: "",
					child_info: "",
					duration_of_breastfeeding: "",
					duration_of_exclusive_breastfeeding: ""
				}
			}
		},
		methods: {
			// check wich content index is active
			modalActiveContent: function(i) {
				return this.active === i
			},

			// close modal
			setModalClose: function() {
				this.$root.showModal = false;
				//if need set active content to zero object       
				// this.active = 0;
			},
			
			validate: function(){
				valid = true;
				if(!this.pregnancy.outcome) {
					$('#outcome_edit').closest('.input-group').removeClass('has-success').addClass('has-vue-error');
					alertify.error("Please select outcome");
					valid = false;
				}
				else {
					$('#outcome_edit').closest('.input-group').removeClass('has-success').removeClass('has-vue-error');
				}
				
				if(!this.pregnancy.mode_of_conception) {
					$('#mode_of_delivery_edit').closest('.input-group').removeClass('has-success').addClass('has-vue-error');
					alertify.error("Please select delivery mode");
					valid = false;
				}
				else {
					$('#mode_of_delivery_edit').closest('.input-group').removeClass('has-success').removeClass('has-vue-error');
				}
				
				return valid;
			},
			
			updatePregnancy: function() {
				console.log("Update Pregnancy Data");

				if(!this.validate()) {
					alertify.error("Please fill all required fields and try again");
					return;
				}
				
				let formData = new FormData();
				formData.append('date_conceived', this.pregnancy.date_conceived)
				formData.append('date_of_delivery', this.pregnancy.date_of_delivery)
				formData.append('place_of_birth', this.pregnancy.place_of_birth)
				formData.append('gestation_age_at_birth', this.pregnancy.gestation_age_at_birth)
				formData.append('labour_complications', this.pregnancy.labour_complications)
				formData.append('year_conceived', this.pregnancy.year_conceived)
				formData.append('mode_of_conception', this.pregnancy.mode_of_conception)
				formData.append('mode_of_delivery', this.pregnancy.mode_of_delivery)
				formData.append('outcome', this.pregnancy.outcome)
				formData.append('pregnancy_complications', this.pregnancy.pregnancy_complications)
				formData.append('gender_id', this.pregnancy.gender_id)
				formData.append('weight', this.pregnancy.weight)
				formData.append('child_info', this.pregnancy.child_info)
				formData.append('duration_of_breastfeeding', this.pregnancy.duration_of_breastfeeding)
				formData.append('duration_of_exclusive_breastfeeding', this.pregnancy.duration_of_exclusive_breastfeeding)

				axios({
					method: 'post',
					url: '<!-- php: = $this->Url->build(['controller' => 'History', 'action' => 'editPastPregnancy']) -->/' + this.pregnancy.id + ".json",
					data: formData,
					config: { headers: {'Content-Type': 'multipart/form-data' }}
				})
				.then(response => {
					//handle success
					console.log(response);
					this.$root.showModal = false;
					this.$root.$emit('updatePreviousPregnancies', '1');
					alertify.success("Successfully updated pregnancy");
				})
				.catch(response => {
					//handle error
					console.log(response)
					alertify.error("Error occurred saving pregnancy");
				});
			}
		},
		
		mounted: function() {
			this.$root.$on('showEditPregnancyDialog', (text) => { // here you need to use the arrow function
				console.log("Show dialog event received. Loading the contents of selected pregnancy: " + text);
				// this.showEditPregnancyModal = true;
				
				// Retrieve the selected pregnancy and open the dialog
				axios.get('<!-- php: = $this->Url->build(['controller' => 'History', 'action' => 'getPastPregnancy']) -->/' + text + ".json")
					.then(response => {
						// this.oldPregnancies = response.data;
						console.log("successfully retrieved data: ");
						this.pregnancy = response.data;
						this.$root.showModal = true;
					})
					.catch(error => {
						console.log(error);
					});
				
				// this.$root.showModal = true;
			});
			
		},
	});
	
	new Vue({
		el: '#app',
		data: {
			showEditPregnancyModal: false,
			active: 0,
			showModal: false,
			cars: [{
					id: 1,
					title: "Default",
					description: "lorem lorem lorem."
				},{
					id: 2,
					title: "Citroen",
					description: "Lorem ipsum."
				}, {
					id: 3,
					title: "Honda",
					description: "Lorem ipsum lorem lorem."
			}]
		},
		
		methods: {
			// set active modal and set index wich content is activeted
			modalOpen: function(i) {
				console.log("Opening dialog for " + i);
				this.showModal = true;
				return this.active = i;
			}
		},
	});
</script>

`;

export default function ElementElementPatientvisitHistoryPastobstetrichistoryBak() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
