<script>
	// Props or imports you can adapt later
	// These could be fetched or imported from an external file if needed
	import { persistentStore } from '../../stores/persistentStore.js';
	import CHANGELOG from '../CHANGELOG.js';

	const TYPE_COLOR = { '+': 'success', '#': 'primary', '-': 'danger' };

	const lastChangelogHash = persistentStore('lastChangelogHash', 'none');

	const CHANGELOG_HASH = (JSON.stringify(CHANGELOG).split('').reduce((a, v) => a + v.charCodeAt(0), 0) % 2 ** 16).toString(36);
	const isNewUpdate = $lastChangelogHash !== CHANGELOG_HASH;

	$lastChangelogHash = CHANGELOG_HASH;

	function parseChanges(changes) {
		return changes
			.trim()
			.split('\n')
			.map((s) => ({
				type: s[0],
				text: s.slice(2)
			}));
	}
</script>

<style>
	body {
		font-family: monospace;
	}

	.col img {
		border: 3px solid #222;
		border-radius: 5px;
	}
</style>

<div class="container mt-5">
	<!-- FAQ -->
	<div class="card mb-3">
		<div class="card-header">FAQ</div>
		<div class="card-body">
			<p class="mb-1"><b>What is this?</b> A USMA-specific coversheet generator.</p>
			<p class="mb-1"><b>Who made this?</b> A cadet.</p>
			<p class="mb-1"><b>Where was this made?</b> A barracks room.</p>
			<p class="mb-1"><b>When was this made?</b> Around 01FEB2023.</p>
			<p class="mb-1"><b>Why was this made?</b> Coversheets suck.</p>
			<p class="mb-1">
				<b>How much does this site cost?</b> This site consumes $2 worth of server credit each month.
			</p>
			<p class="mb-1"><b>How was this made?</b> Svelte, Bootstrap and a B Weekend.</p>
		</div>
	</div>

	<!-- Help -->
	<div class="card mb-3">
		<div class="card-header">Help</div>
		<div class="card-body">
			<p class="text-center">
				Contact
				<a href="mailto:korbin.deary@westpoint.edu">korbin.deary@westpoint.edu</a> for any questions,
				comments or concerns.
			</p>
			<div class="accordion accordion-flush" id="qaAccordion">
				<!-- FAQ Item 1 -->
				<div class="accordion-item">
					<h2 class="accordion-header" id="flush-headingOne">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#flush-collapseOne"
							aria-expanded="false"
							aria-controls="flush-collapseOne"
						>
							Why are there links and page numbers at the top of the page when I try to print?
						</button>
					</h2>
					<div
						id="flush-collapseOne"
						class="accordion-collapse collapse"
						aria-labelledby="flush-headingOne"
						data-bs-parent="#qaAccordion"
					>
						<div class="accordion-body">
							<p class="mb-2">
								Firefox users may run into this issue. To remove the links and headers: On the
								print dialog, click "More settings" then uncheck the "Print headers and footers"
								checkbox.
							</p>
							<hr />
							<div class="row">
								<div class="col">
									<img class="w-100" src="/help_images/firefox_headers_1.png" />
								</div>
								<div class="col">
									<img class="w-100" src="/help_images/firefox_headers_2.png" />
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- FAQ Item 2 -->
				<div class="accordion-item">
					<h2 class="accordion-header" id="flush-headingTwo">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#flush-collapseTwo"
							aria-expanded="false"
							aria-controls="flush-collapseTwo"
						>
							Why do my signatures move positions when I paste the coversheet into Word?
						</button>
					</h2>
					<div
						id="flush-collapseTwo"
						class="accordion-collapse collapse"
						aria-labelledby="flush-headingTwo"
						data-bs-parent="#qaAccordion"
					>
						<div class="accordion-body">
							<p class="mb-2">
								Unfortunately, this is an unfixable issue with Microsoft Word. However, the
								signatures' positions can be easily fixed within Word. In Word: Right-click the
								signature you would like to reposition, hover over "Wrap Text" then click "In
								Front of Text". You will then be able to freely position the signature without it
								affecting the text.
							</p>
							<hr />
							<div class="row">
								<div class="col-md-4 offset-md-4">
									<img class="w-100" src="/help_images/paste_images_1.png" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Changelog -->
	<div class="card">
		<div class="card-header">Changelog</div>
		<div class="card-body" id="changelog-body">
			{#each CHANGELOG as entry, i}
				<div class="card {i !== CHANGELOG.length - 1 ? 'mb-3' : ''}">
					<div
						class="card-header fw-bold {isNewUpdate && i === 0 ? 'text-bg-dark' : ''}"
					>
						{#if isNewUpdate && i === 0}
							[NEW]
						{/if}
						{entry.date}
					</div>
					<div class="card-body">
						{#each parseChanges(entry.changes) as change}
							<p class="card-text mb-1">
								<span class="text-{TYPE_COLOR[change.type]} fw-bold">[{change.type}]</span>
								{change.text}
							</p>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
