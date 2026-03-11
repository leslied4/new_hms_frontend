import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitDoctorNotes/get_all_doctor_notes.php';
const rawHtml = `
<div>									
	<div class="row">
		<div class="col-md-12 col-sm-12">
			<div class="card card-box">
				<div class="card-body" id="bar-parent">
                    <!-- php: foreach ($notes as $key => $note): -->
                        <div class="row">
                            <div class="col-md-12">
                                <span class="badge badge-danger"><!-- php: = $note->user->first_name --> <!-- php: = $note->user->last_name --></span>
                                <span class="badge badge-warning"><!-- php: = $note->user->role->name --></span>
                                <span class="badge badge-primary"><!-- php: = $note->date_added->nice() --> </span>
                                <!-- php: = isset($note->lab_request_id) ? '<span class="badge badge-secondary">Lab Request Comment</span>' : '' -->
                                <!-- php: = isset($note->scan_request_id) ? '<span class="badge badge-secondary">Scan Request Comment</span>' : '' -->
                                <!-- php: = isset($note->special_instruction) ? '<span class="badge badge-secondary">Special Instruction</span>' : '' -->
                                <!-- php: = isset($note->medication_notes) ? '<span class="badge badge-secondary">Medicaiton Notes</span>' : '' -->
                            </div>
                            <div class="col-md-12">
                                <!-- php: = $note->notes -->
                            </div>
                        </div>
                    <!-- php: endforeach; -->
                    <!-- php: if (($notes->count()) < 1): -->
                        <div class="row">
                            <div class="col-md-12">
                                No Notes Available
                            </div>
                        </div>
                    <!-- php: endif; -->
				</div>
			</div>
		</div>
	</div>
</div>
`;

export default function PatientVisitDoctorNotesGetAllDoctorNotesPage() {
  return (
    <PageShell title="PatientVisitDoctorNotes/get_all_doctor_notes.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
