import PageShell from '../../components/PageShell';

const sourcePath = 'templates/PatientVisitNurseNotes/get_all_nurse_notes.php';
const rawHtml = `
<style>
    .form-control {
        width: 100%;
        /* padding: 10px; */
        border: 1px solid #ddd;
        border-radius: 6px;
        transition: all 0.3s ease;
    }
</style>
<div class="notes-container">
    <div class="row">
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-body" id="notes-parent">
                    <!-- php: if (!empty($notes) && sizeof($notes) > 0): -->
                        <!-- php: foreach ($notes as $key => $note): -->
                            <div class="note-entry mb-4 pb-3 border-bottom">
                                <div class="note-header d-flex justify-content-between align-items-center mb-3">
                                    <div class="note-metadata">
                                        <span class="badge bg-primary me-2">
                                            <!-- php: = htmlspecialchars($note->user->first_name . ' ' . $note->user->last_name) -->
                                        </span>
                                        <span class="badge bg-secondary">
                                            <!-- php: = $note->date_added->nice() -->
                                        </span>
                                        <!-- php: $noteTypeClass = ''; switch ($note->note_type) { case 'doctor': $noteTypeClass = 'btn-danger'; break; case 'nurse': $noteTypeClass = 'btn-warning'; break; } -->
                                        <span class="btn btn-xs btn-outline-primary <!-- php: = $noteTypeClass -->">
                                            <!-- php: = $note->note_type -->
                                        </span>
                                    </div>
                                    <div class="note-type">
                                        <!-- php: $typeClass = ''; $typeLabel = ''; switch ($note->type) { case 'sbar': $typeClass = 'bg-danger'; $typeLabel = 'SBAR'; break; case 'ipass': $typeClass = 'bg-warning'; $typeLabel = 'I-PASS'; break; case 'heads_up': $typeClass = 'bg-success'; $... -->
                                        <span class="badge <!-- php: = $typeClass -->">
                                            TYPE: <!-- php: = $typeLabel -->
                                        </span>
                                    </div>
                                </div>

                                <div class="note-content">
                                    <!-- php: if ($note->type == 'sbar'): -->
                                        <div class="note-section">
                                            <div class="section-label">Situation</div>
                                            <div class="form-control"><!-- php: = $note->situation --></div>
                                            
                                            <div class="section-label">Background</div>
                                            <div class="form-control"><!-- php: = $note->background --></div>
                                            
                                            <div class="section-label">Assessment</div>
                                            <div class="form-control"><!-- php: = $note->assessment --></div>
                                            
                                            <div class="section-label">Recommendation</div>
                                            <div class="form-control"><!-- php: = $note->recommendation --></div>
                                        </div>

                                    <!-- php: elseif ($note->type == 'ipass'): -->
                                        <div class="note-section">
                                            <div class="section-label">Illness Severity</div>
                                            <div class="form-control"><!-- php: = $note->illness_severity --></div>
                                            
                                            <div class="section-label">Patient Summary</div>
                                            <div class="form-control"><!-- php: = $note->patient_summary --></div>
                                            
                                            <div class="section-label">Action List</div>
                                            <div class="form-control"><!-- php: = $note->action_list --></div>
                                            
                                            <div class="section-label">Situation Awareness</div>
                                            <div class="form-control"><!-- php: = $note->situation_awareness --></div>
                                            
                                            <div class="section-label">Receiver Comments</div>
                                            <div class="form-control"><!-- php: = $note->receiver_comments --></div>
                                        </div>

                                    <!-- php: elseif ($note->type == 'heads_up'): -->
                                        <div class="note-section">
                                            <div class="section-label">Patient History</div>
                                            <div class="form-control"><!-- php: = $note->patient_history --></div>
                                            
                                            <div class="section-label">Recent Events</div>
                                            <div class="form-control"><!-- php: = $note->recent_events --></div>
                                            
                                            <div class="section-label">Anticipated Changes</div>
                                            <div class="form-control"><!-- php: = $note->anticipated_changes --></div>
                                            
                                            <div class="section-label">Pending Diagnostics</div>
                                            <div class="form-control"><!-- php: = $note->pending_diagnostics --></div>
                                            
                                            <div class="section-label">Patient Stability Status</div>
                                            <div class="form-control"><!-- php: = $note->patient_stability_status --></div>
                                            
                                            <div class="section-label">Task Description</div>
                                            <div class="form-control"><!-- php: = $note->task_description --></div>
                                            
                                            <div class="section-label">Priorities</div>
                                            <div class="form-control"><!-- php: = $note->priorities --></div>
                                        </div>

                                    <!-- php: else: -->
                                        <div class="alert alert-secondary">
                                            <!-- php: = ($note->notes) -->
                                        </div>
                                    <!-- php: endif; -->
                                </div>
                            </div>
                        <!-- php: endforeach; -->
                    <!-- php: else: -->
                        <div class="alert alert-info text-center">
                            <i class="fa fa-info-circle me-2"></i>
                            No Notes Available
                        </div>
                    <!-- php: endif; -->
                </div>
            </div>
        </div>
    </div>
</div>
`;

export default function PatientVisitNurseNotesGetAllNurseNotesPage() {
  return (
    <PageShell title="PatientVisitNurseNotes/get_all_nurse_notes.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
