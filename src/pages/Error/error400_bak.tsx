import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Error/error400_bak.php';
const rawHtml = `
<!-- php: use Cake\Core\Configure; use Cake\Error\Debugger; $this->layout = 'error'; if (Configure::read('debug')): $this->layout = 'dev_error'; $this->assign('title', $message); $this->assign('templateName', 'error400.ctp'); $this->start('file'); -->
<!-- php: if (!empty($error->queryString)) : -->
    <p class="notice">
        <strong>SQL Query: </strong>
        <!-- php: = h($error->queryString) -->
    </p>
<!-- php: endif; -->
<!-- php: if (!empty($error->params)) : -->
        <strong>SQL Query Params: </strong>
        <!-- php: Debugger::dump($error->params) -->
<!-- php: endif; -->
<!-- php: = $this->element('auto_table_warning') -->
<!-- php: if (extension_loaded('xdebug')): xdebug_print_function_stack(); endif; $this->end(); endif; -->
<h2><!-- php: = h($message) --></h2>
<p class="error">
    <strong><!-- php: = __d('cake', 'Error') -->: </strong>
    <!-- php: = __d('cake', 'The requested address {0} was not found on this server.', "<strong>'{$url}'</strong>") -->
</p>

`;

export default function ErrorError400BakPage() {
  return (
    <PageShell title="Error/error400_bak.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
