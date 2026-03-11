import PageShell from '../../components/PageShell';
import SearchableSelectField from '../../components/SearchableSelectField';

const sourcePath = 'templates/ShiftScheduler/edit_timeslot.php';
const rawHtml = `
<div class="card col-md-8 container card-topline-<!-- php: = $theme1 -->">

<div class="card  card-box">
	<div class="card-head">
		<header>Edit Time Slot</header>
	</div>
	<div class="card-body">
    <div class="container-fluid px-2 mt-3">
    <!-- php: = $this->Form->create(null, ['url' => ['controller' => 'ShiftScheduler', 'action' => 'editTimeSlot', $timeslot->id]]); -->
        <div class="form-group row">
            <label class="control-label col-md-2">Name
                <span class="required"> * </span>
            </label>
            <div class="col-md-8">
                <SearchableSelectField name="name" id="name" class="form-control">
                    <option>-- Select Type --</option>
                    <option <!-- php: = $timeslot->name == "Morning" ? "selected" : "" --> value="Morning">Morning</option>
                    <option <!-- php: = $timeslot->name == "Afternoon" ? "selected" : "" --> value="Afternoon">Afternoon</option>
                    <option <!-- php: = $timeslot->name == "Evening" ? "selected" : "" --> value="Evening">Evening</option>
                    <option <!-- php: = $timeslot->name == "Night" ? "selected" : "" --> value="Night">Night</option>
                    <option <!-- php: = $timeslot->name == "OverNight" ? "selected" : "" --> value="OverNight">OverNight</option>
                    <option <!-- php: = $timeslot->name == "Mid-Morning" ? "selected" : "" --> value="Mid-Morning">Mid-Morning</option>
                    <option <!-- php: = $timeslot->name == "Mid-Afternoon" ? "selected" : "" --> value="Mid-Afternoon">Mid-Afternoon</option>
                </SearchableSelectField>
            </div>
        </div>
        
        <div class="form-group row">
            <label class="control-label col-md-2">Start
                
            </label>
            <div class="col-md-8">
                <input type="time" value="<!-- php: = $timeslot->start -->" name="start" id="start" data-required="0" placeholder="Enter Start" class="form-control input-height" /> 
            </div>
        </div>
        <div class="form-group row">
            <label class="control-label col-md-2">End
                
            </label>
            <div class="col-md-8">
                <input type="time" value="<!-- php: = $timeslot->end -->" name="end" id="end" data-required="0" placeholder="Enter End" class="form-control input-height" /> 
            </div>
        </div>
        
        <div class="row">
            <div class="offset-md-2 col-md-8">
                <button type="submit" class="btn btn-info">Update</button>
                <!-- <button type="button" class="btn btn-default" onclick = 'clearInvestigationFields()'>Reset</button> -->
            </div>
        </div>
    <!-- php: =$this->Form->end(); -->
    </div>
    </div>
    </div>
    </div>
`;

export default function ShiftSchedulerEditTimeslotPage() {
  return (
    <PageShell title="ShiftScheduler/edit_timeslot.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
