const rawHtml = `
<div class="row">

    <div class="borderBox light bordered col-md-12">
       
        <div class="borderBox-body">
<div class="container-fluid px-2">
    <div class="row justify-content-center">
        <div class="container-fluid text-center p-3 mt-3 mb-2">
            <div class="card px-5 pt-4 mt-1 mb-3">
            <table id="decommision-table" class="table">
                    <thead>
                        <th>Date Started</th>
                        <th>Model No. / Name</th>
                        <th>Planned Maintenance Schedule</th>
                        <th>Status</th>
                        <th>Actions</th>
                    <thead>
                    <tbody>
                        <tr>
                            <td>22/09/2022</td>
                            <td>Model One</td>
                            <td>24/10/2022</td>
                            <td>Pending</td>
                            <td>
                                <button class="btn btn-xs btn-warning">Edit</button>
                                <button class="btn btn-xs btn-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>
            </table>
        </div>
    </div>
</div>
</div>
    </div>
</div>
</div>

<script>
    $('#decommision-table').DataTable();
</script>
`;

export default function ElementElementInventorylistDecommision() {
  return <div dangerouslySetInnerHTML={{ __html: rawHtml }} />;
}
