const rawHtml = `
<div class="row">
	<div class="borderBox light bordered col-md-12">
		<div class="borderBox-title tabbable-line">
			<div class="caption">
				<span class="caption-subject font-dark bold uppercase">Partners/Payers</span>
			</div>
			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a href="#partners_add" data-toggle="tab"> Add </a>
				</li>
				<li class="nav-item">
					<a href="#partners_view" data-toggle="tab"> View </a>
				</li>
			</ul>
		</div>
		<div class="borderBox-body">
			<div class="tab-content">
				<div class="tab-pane " id="partners_add">
					<h4 class="mt-4">Add Partners/Payers</h4>
					<!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Accounts', 'action' => 'addPartner']]); -->
						<div class="form-group row">
							<label class="control-label col-md-2">Title
								<span class="required"> * </span>
							</label>
							<div class="col-md-5">
								<input type="text" name="title" id="title" data-required="1" placeholder="Enter Title" class="form-control input-height" required /> 
							</div>
						</div>
						
						<div class="form-group row">
							<label class="control-label col-md-2">Description
								
							</label>
							<div class="col-md-5">
								<textarea name="description" id="description" data-required="0" placeholder="Enter description" class="form-control input-height"></textarea> 
							</div>
						</div>
						
						<div class="row">
							<div class="offset-md-2 col-md-8">
								<button type="submit" class="btn btn-info">Submit</button>
							</div>
						</div>
					<!-- php: =$this->Form->end(); -->
					
				</div>
				<div class="tab-pane active" id="partners_view">
					<div class="card  card-box">
						<div class="card-body ">
						  <div class="table-scrollable">
							<table id="partners-table" class="table table-hover table-checkable order-column full-width slimDataTable">
								<thead>
									<tr>
										<th class="left">Title</th>
										<th class="left">Description</th>
										<th class="left">Action</th>
									</tr>
								</thead>
								<tbody>
										<!-- php: foreach($partners as $partner){ -->
                                            <tr>
                                                <td><!-- php: = $partner->title --></td>
                                                <td><!-- php: = $partner->description --></td>
                                                <td>
                                                    <a href="javascript:" data-toggle="modal" data-target="#editpartnerModal_<!-- php: =$partner->id -->" class="btn btn-warning btn-xs">Edit</a>
                                                    <a href="<!-- php: = $this->Url->build(['controller' => 'Accounts', 'action' => 'deletePartner', $partner->id]) -->" class="btn btn-danger btn-xs">Delete</a>
                                                </td>
                                            </tr>
                                           
                                        <!-- php: } -->	
                                        			
								</tbody>
							</table>
							</div>
						</div>
					</div>
				
				</div>
			</div>
		</div>
		
	</div>
</div>
<!-- php: foreach($partners as $partner){ -->
<div class="modal fade" id="editpartnerModal_<!-- php: =$partner->id -->" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-md  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="container px-0 border border-2 border-danger">
                <div class="container-fluid pr-0 bg-danger">
                    <div class="d-flex align-items-center justify-content-between">
                        <h4 class="text-slate-900 my-0">Edit Partner/Payer
                            Information</h4>
                        <div>
                            <button data-dismiss="modal" aria-label="Close"
                                class="btn custom-btn border-0 bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"><i
                                    class="fa fa-times text-primary"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="container bg-white p-2">
                    <div class="container my-2 p-3">
                        <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'Accounts', 'action' => 'editPartner',$partner->id]]); -->
                        <div class="form-group row">
                            <label class="control-label col-md-3">Title
                                <span class="required"> * </span>
                            </label>
                            <div class="col-md-8">
                                <input type="text" name="title" id="title" data-required="1" placeholder="Enter Title"
                                    class="form-control input-height" value="<!-- php: = $partner->title -->" required />
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="control-label col-md-3">Description

                            </label>
                            <div class="col-md-8">
                                <textarea name="description" id="description" data-required="0"
                                    placeholder="Enter description"
                                    class="form-control input-height"><!-- php: = $partner->description --></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid pr-0 bg-danger">
                    <div class="d-flex align-items-center py-1 justify-content-end">


                        <button type="submit" style="height:20px;width:auto;"
                            class="btn  bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center">Submit</button>
                        <!-- php: = $this->Form->end() -->
                        <button style="height:20px;width:auto;"
                            class="btn bg-white btn-sm px-1 mr-1 d-flex align-items-center justify-content-center"
                            data-dismiss="modal" aria-label="Close">Cancel&nbsp;<i
                                class="fa fa-times text-danger fa-1x"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- php: } -->

<script>
    $("#partners-table").DataTable();

	function clearHealthFacilityFields(){
		$('#name').val('');
		$('#description').val('');
	}
</script>

`;

export default function ElementElementAccountsPartners() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
