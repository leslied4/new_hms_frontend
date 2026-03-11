import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/PatientVisits/get_queue_manager.php';
const rawHtml = `

<!--main body-->
<div class="row">
	<div class="col-md-12">
		<div class="card card-topline-<!-- php: = $theme1 -->">
			
			<div class="card  card-box">
				<div class="card-head">
					<ul class="nav " id="patientInfoTab">
                        <li class="nav-item tab-all p-l-20">
                            <a class="nav-link font-weight-bold" href="#subscribe_order" data-toggle="tab">Subscribe For Call Orders</a>
                        </li>
                        <li class="nav-item tab-all p-l-20">
                            <a class="nav-link active font-weight-bold" href="#sms_history" data-toggle="tab">Call Orders</a>
                        </li>
                        <li class="nav-item tab-all p-l-20">
                            <a class="nav-link font-weight-bold" href="#assign_user" data-toggle="tab">Assign User</a>
                        </li>
                    </ul>
				</div>
				<div class="card-body ">
					<div class="tab-content">

						<div class="tab-pane active" id="sms_history">
                            <div class="d-flex align-items-center">
                                <span class="ml-2">Filter Specialty Locations:</span>
                                <div class="col-md-5">

                                    <SearchableSelectField name="infacilityLocation" class="form-control" id="infacility_live_location1" onchange="getLocationQueues()">
                                        <option value=""></option>
                                    </SearchableSelectField>
                                </div>
                                <div class="col-md-3">

                                    <!-- <button class="btn btn-xs btn-danger" onclick="getLocationQueues()">refresh</button> -->
                                </div>
                            </div>
							<div class="table-responsive mt-1">
                                
                                <table class="table table-hover table-striped order-column full-width" id="queue_manager_list">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Folder No.</th>

                                            <th scope="col">Status</th>
                                            <th scope="col">Waiting Time</th>
                                            <th scope="col">Actions</th>

                                        </tr>
                                    </thead>
                                    <tbody id="queue_manager_body"></tbody>
                                </table>
							</div>

						</div>
						<div class="tab-pane" id="subscribe_order">

                            <div class="d-flex align-items-center justify-content-center px-5 pt-5 mt-5 mx-5">
                                <span class="col-md-3">Working Location</span>
                                <div class="col-md-4">

                                    <SearchableSelectField name="infacilityLocation" class="form-control full-width" id="infacility_live_location2" data-live-search="true">
                                    </SearchableSelectField>
                                </div>
                                <div class="col-md-3">
                                    <button class="btn btn-info btn-md" onclick="subscribeToLocations2()">Subscribe</button>
                                </div>
                            </div>
                            <div class="d-flex align-items-center justify-content-center flex-column mt-5">
                                <h3 class="m-0">Subscribed Stations</h3>
                                <div id="subscribedLocations">

                                </div>
                            </div>

						</div>
						<div class="tab-pane" id="assign_user">

                            <div class="d-flex align-items-center justify-content-center flex-column mt-5">
                                <h3 class="m-0">Queue Manager Locations</h3>
                                <table class="table table-hover table-striped order-column full-width" id="queue_manager_list_info">
                                    <thead>
                                        <tr>
                                            <th scope="col">Location</th>
                                            <th scope="col">User</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="queueManagerLocations"></tbody>
                                </table>
  
                            </div>

                            <div class="d-flex align-items-center justify-content-center px-5 pt-5 mt-5 mx-5">
                                <div class="col-md-4">

                                    Locations: <SearchableSelectField name="infacilityLocation" class="form-control" id="infacility_live_location3" data-live-search="true">
                                    </SearchableSelectField>
                                </div>
                                <div class="col-md-4">

                                    Users: <SearchableSelectField name="infacilityLocation" class="form-control" id="location_users" data-live-search="true">
                                    </SearchableSelectField>
                                </div>
                                <div class="col-md-3 d-flex flex-column justify-content-end">
                                    Assign
                                    <button class="btn btn-info btn-md" onclick="assignUserToLocation()">Assign</button>
                                </div>
                            </div>


						</div>
					</div>
				</div>
			</div>


		</div>
	</div>
</div>



<script>

    function getAge(dateString) {
		var ageInMilliseconds = new Date() - new Date(dateString);
		return Math.floor(ageInMilliseconds/1000/60/60/24/365); // convert to years
	}

    function recallPatient(id) {
        $.ajax({
			type: 'POST',
			url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'recallQueuedPatient']) -->",
			data: {
                'log_id': id
            },
			success: function g(data, textStatus) {
                alertify.log(data.message)

			},
			fail: function g(xhr, textStatus, errorThrown) {
                console.log(xhr);
			}
		});
    }

    function getQueueList(id) {


        $.ajax({
			type: 'GET',
			url: "<!-- php: = $this->Url->build(['controller' => 'Patients', 'action' => 'viewPendingQueuedVisits']) -->/" + id,
			data: [],
			success: function g(data, textStatus) {
                
                let result = ''
                let isCalledFirst = 0
                data.data.forEach(row => {
                    let image = ''
                    if (row.patient_visit?.patient?.image != undefined) {
                        image = row.patient_visit.patient.image?.file_path
                    }else{
                        image = (row.patient_visit.patient?.gender_id == 2) ? 'dp2.jpg' : 'dp3-.jpg'
                    }
                    let gender = row.patient_visit?.patient?.gender_id == 1 ?  'Male': 'Female' 
                    let age = getAge(row.patient_visit.patient?.date_of_birth)
                    let called = ''
                    let isCalled = ''
                    
                    if (row.queue_manager_log) {
                        called = \`<span class="badge badge-warning badge-pill">called</span>\`
                        if (row.queue_manager_log.state == 3) {
                            called = \`<span class="badge badge-danger badge-pill">absent</span>\`
                        }
                        isCalled = true
                        if (row.queue_manager_log.state == 2) {
                            
                            isCalledFirst +=1
                        }
                    }
                        
                    result +=   \`
                        <tr id="\${row.id}" style="border-top: \${isCalledFirst == 1 ? '3px solid red' : 'none'}">
                            <td><img src="<!-- php: = $this->Url->webroot('img') -->/\${image}" width="40px" height="40px" style="border-radius: 50% 50% 50% 50%;" alt=""></td>
                            <td>\${row.patient_visit?.patient?.first_name} \${row.patient_visit?.patient?.last_name} <span class="badge badge-primary">\${gender}</span> \${row.patient_visit.patient?.date_of_birth == undefined ? '': '<span class="badge badge-success">' + age + ' yrs </span>'}</td>
                            <td>\${row.patient_visit?.patient?.folder_number ? (row.patient_visit?.patient?.folder_number).slice(0,15) : ''}</td>
                            <td>\${called}</td>
                            <td>\${moment(row.date_created).fromNow()}</td>
                            <td>\${isCalled ? \`<button class='btn btn-xs btn-info' onclick="recallPatient('\${row.queue_manager_log.id}')">recall</button>\` : ""}</td>
                        </tr>
                    \`
                });
                $('#queue_manager_body').html('')
                $('#queue_manager_body').html(result)

			},
			fail: function g(xhr, textStatus, errorThrown) {
                console.log(xhr);
			}
		});

        new Sortable(document.getElementById('queue_manager_body'), {
            animation: 150,
            onEnd: function(evt) {
                var order = [];
                $('#queue_manager_list tbody tr').each(function(index, element) {
                    order.push($(element).attr('id'));
                });

                
                $.ajax({
                    type: 'POST',
                    url: "<!-- php: = $this->Url->build(['controller' => 'PatientVisits', 'action' => 'reorderQueue']) -->/",
                    data: {
                        'specialty': $('#infacility_live_location1').val(),
                        'order': order

                    },
                    success: function g(data, textStatus) {
                        getLocationQueues()
                        alertify.success("Reordered Successfully")

                    },
                    fail: function g(xhr, textStatus, errorThrown) {
                        console.log(xhr);
                    }
                });
            }
        });
    }

    function fetchLiveLocations() {
		$.ajax({
			type: 'GET',
			url: "<!-- php: = $this->Url->build(['controller' => 'Settings', 'action' => 'infacilityLocations']) -->",
			data: [],
			success: function g(data, textStatus) {
                let result = ['<option value="">All Call Orders</option>']

                data.forEach(ele => {
                    result.push(\`<option data-content='\${ele.name} <span class="badge badge-danger badge-pill">\${ele.specialty.name}</span>' value="\${ele.id}">\${ele.name}</option>\`)
                });

                // $(\`#infacility_live_location1\`).html(result.join(""));
                // $(\`#infacility_live_location1\`).selectpicker('refresh');

                result.shift()

                $(\`#infacility_live_location2\`).html(result.join(""));
                $(\`#infacility_live_location2\`).selectpicker('refresh');

                $(\`#infacility_live_location3\`).html(result.join(""));
                $(\`#infacility_live_location3\`).selectpicker('refresh');

			},
			fail: function g(xhr, textStatus, errorThrown) {
                console.log(xhr);
			}
		});
	}

    function subscribeToLocations2() {
        $.ajax({
            url: '<!-- php: =$this->Url->build(['controller'=>'Settings','action'=>'subscribeInfacilityLocations']) -->',
            method: 'POST',
            data: {
                'infacility_location_id': $('#infacility_live_location2').val()
            },
            beforeSend: function () {
            },
            success: function (data) {
                alertify.log(data.message)
                showSubscribedInformation2()
            },
            error: function (xhr, status, error) {
                console.error('Error:', status, error);
            }
        });
    }
    function showSubscribedInformation2() {
        $.ajax({
            url: '<!-- php: =$this->Url->build(['controller'=>'Settings','action'=>'fetchSubscribedLocations']) -->',
            method: 'GET',
            beforeSend: function () {
            },
            success: function (data) {
                let result = ''
                data.forEach(ele => {
                    result +=\`
                        <div class="d-flex align-items-center justify-content-center">
                            <h4>\${ele.infacility_location.name}</h4>
                            <div class="col-md-3">
                                <button class="btn btn-info btn-xs btn-danger" onclick="unsubscribeFacilityLocation2('\${ele.infacility_location.id}')">Unsubscribe</button>
                            </div>
                        </div>
                    \`
                });
                $('#subscribedLocations').html(result)
            },
            error: function (xhr, status, error) {
                console.error('Error:', status, error);
            }
        });
    }
    function showSubscribedLocationSpecialties() {
        $.ajax({
            url: '<!-- php: =$this->Url->build(['controller'=> 'Settings', 'action'=>'subscribeInfacilityLocationSpecialties']) -->',
            method: 'GET',
            beforeSend: function () {
            },
            success: function (data) {
                let result = '<option>Select</option>'
                data.forEach(ele => {
                    result +=\`
                        <option class="" value="\${ele.infacility_location.specialty.id}" data-content="\${ele.infacility_location.specialty.name}">
                            \${ele.infacility_location.specialty.name}
                        </option>
                    \`
                });
                $(\`#infacility_live_location1\`).html(result);
                $(\`#infacility_live_location1\`).selectpicker('refresh');
                
                if (data.length > 0) {
                    $(\`#infacility_live_location1\`).val(data[0]?.infacility_location.specialty.id);
                    $(\`#infacility_live_location1\`).selectpicker('refresh');
                    getLocationQueues()
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', status, error);
            }
        });
    }

    function unsubscribeFacilityLocation2(id) {
        $.ajax({
            url: '<!-- php: =$this->Url->build(['controller'=>'Settings','action'=>'unsubscribeFacilityLocation']) -->/'+id,
            method: 'POST',
            beforeSend: function () {
            },
            success: function (data) {
                alertify.log(data.message)
                showSubscribedInformation2()
            },
            error: function (xhr, status, error) {
                console.error('Error:', status, error);
            }
        });
    }


    function showQueueManagerLocations() {
        $.ajax({
            url: '<!-- php: =$this->Url->build(['controller'=>'PatientVisits','action'=>'getQueueManagerLocations']) -->',
            method: 'GET',
            beforeSend: function () {
            },
            success: function (data) {
                let result = ''
                data.forEach(ele => {
                    result +=\`
                        <tr>
                            <td>
                                \${ele.infacility_location.name}
                            </td>
                            <td>
                                \${ele.user.first_name} \${ele.user.last_name}
                            </td>
                            <td>
                                <button class="btn btn-info btn-xs btn-danger" onclick="unassignUserToLocation('\${ele.infacility_location.id}', '\${ele.user.id}')">Unassign</button>
                                </div>
                            </td>
                        </tr>
                    \`
                });
                $('#queueManagerLocations').html('')
                $('#queueManagerLocations').html(result)
            },
            error: function (xhr, status, error) {
                console.error('Error:', status, error);
            }
        });
    }

    function unassignUserToLocation(location_id, user_id) {
        $.ajax({
            url: '<!-- php: =$this->Url->build(['controller'=>'PatientVisits','action'=>'unassignUserToLocation']) -->/'+location_id+'/'+user_id,
            method: 'POST',
            beforeSend: function () {
            },
            success: function (data) {
                alertify.log(data.message)
                showQueueManagerLocations() 
            },
            error: function (xhr, status, error) {
                console.error('Error:', status, error);
            }
        });
    }

    function fetchLocationUsers(location_id) {
        $.ajax({
            url: '<!-- php: =$this->Url->build(['controller'=>'Users','action'=>'getLocationUsers']) -->',
            method: 'GET',
            success: function (data) {
                result = ''
                data.forEach(ele => {
                    result += \`<option value="\${ele.id}">\${ele.first_name} \${ele.last_name}</option>\`
                });
                $(\`#location_users\`).html(result)
                $(\`#location_users\`).selectpicker('refresh');
            },
        })
    }

    function assignUserToLocation() {
        $.ajax({
            url: '<!-- php: =$this->Url->build(['controller'=>'PatientVisits','action'=>'assignUserToLocation']) -->',
            method: 'POST',
            data: {
                'location_id': $('#infacility_live_location3').val(),
                'user_id': $('#location_users').val()
            },
            success: function (data) {
                alertify.log(data.message)
                showQueueManagerLocations()
            },
            error: function (xhr, status, error) {
                console.error('Error:', status, error);
            }
        })
    }

    function freeUserInQueueManager() {
        $.ajax({
            url: '<!-- php: =$this->Url->build(['controller'=>'PatientVisits','action'=>'freeUserInQueueManager']) -->/',
            method: 'POST',
            success: function (data) {
                alertify.log(data.message)
            },
            error: function (xhr, status, error) {
                console.error('Error:', status, error);
            }
        })
    }

    function getLocationQueues() {
        let location = $('#infacility_live_location1').val();
        if (location) {
            getQueueList(location)
        }
    }

    $(document).ready(function() {
        fetchLiveLocations()
        showSubscribedInformation2()
        showSubscribedLocationSpecialties()
        showQueueManagerLocations()
        fetchLocationUsers()

	})
</script>
`;

export default function PatientVisitsGetQueueManagerPage() {
  return (
    <PageShell title="PatientVisits/get_queue_manager.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
