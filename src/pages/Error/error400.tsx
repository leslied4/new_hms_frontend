import PageShell from '../../components/PageShell';

const sourcePath = 'templates/Error/error400.php';
const rawHtml = `
<!-- php: use Cake\Core\Configure; use Cake\Error\Debugger; $this->layout = 'customerror'; if (Configure::read('debug')) { $this->layout = 'dev_error'; $this->assign('title', $message); $this->assign('templateName', 'error400.ctp'); $this->start('fil... -->
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
<!-- php: if (extension_loaded('xdebug')): xdebug_print_function_stack(); endif; $this->end(); -->

<h2><!-- php: = h($message) --></h2>
<p class="error">
    <strong><!-- php: = __d('cake', 'Error') -->: </strong>
    <!-- php: = __d('cake', 'The requested address {0} was not found on this server.', "<strong>'{$url}'</strong>") -->
</p>

<!-- php: } else { $this->layout = 'default'; -->

<!-- php: = $this->Html->css('../assets/css/pages/extra_pages.css') -->
<div class="limiter">
	<div class="container-login100">
		<div class="wrap-login100">
			<form class="form-404">
				<span class="form404-title p-b-34 p-t-27">
					<!-- php: = h($message) -->
				</span>
				<p class="content-404"><!-- php: = __d('error', 'The requested address {0} was not found on this server.', "<strong>'{$url}'</strong>") --></p>
				<div class="container-login100-form-btn">
					<a href="<!-- php: = $this->Url->build(['controller' => 'Home', 'action' => 'index']) -->" class="login100-form-btn">
						Go to home page
					</a>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- php: } -->
`;

export default function ErrorError400Page() {
  return (
    <PageShell title="Error/error400.php" sourcePath={sourcePath}>
      <div className="template-frame">
        <div
          className="template-content"
          dangerouslySetInnerHTML={{ __html: rawHtml }}
        />
      </div>
    </PageShell>
  );
}
