<script>
	import { onMount, afterUpdate, beforeUpdate, tick } from 'svelte';
	import SignaturePad from 'signature_pad';
	// import { PDFDocument } from 'pdf-lib';
	// import html2pdf from 'html2pdf.js';
	import AutoComplete from 'simple-svelte-autocomplete';
	import Coversheet from './Coversheet.svelte';
	import CorpsCard from './CorpsCard.svelte';
	import { COURSE_NAMES } from '../courses.js';
	import CHANGELOG from './CHANGELOG.js';
	import { persistentStore } from '../stores/persistentStore.js';

	const lastChangelogHash = persistentStore('lastChangelogHash', 'none');
	const CHANGELOG_HASH = (JSON.stringify(CHANGELOG).split('').reduce((a, v) => a + v.charCodeAt(0), 0) % 2 ** 16).toString(36);
	let isNewUpdate = $lastChangelogHash !== CHANGELOG_HASH;

	let coversheetComponent;
	let coversheetFrame = {
		postMessage: () => {}
	};
	let sigPadCanvas;
	let sigPadContext;
	let uploadSignatureElem;
	let prependPDFFileInputElem;

	let signaturePad = null;
	let cadetsErrorText = "";
	let parsedCadets = [];
	let cadetLastName = "LastName";
	let savedSignatures = [];
	let showingSuccessfulCopyText = false;
	let showingSuccessfulCopyImage = false;
	let pronoun = "I";

	// Form vars
	let assignmentName = "";
	let courseName = "";
	let section = "";
	let instructor = "";
	let cadets = "";
	let assignmentDate = "";
	let shouldAddSignatureDate = true;
	let endText = "";
	let certificationOption = "used";
	let aiCertificationOption = "unused";

	onMount(() => {
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
		const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
		savedSignatures = getSavedSignatures();
		console.log('go f1rehouse 🔥🔥🔥');

		document.addEventListener('paste', async (e) => {
			const clipboardItems = typeof navigator?.clipboard?.read === 'function' ? await navigator.clipboard.read() : e.clipboardData.files;

			for (const clipboardItem of clipboardItems) {
				let blob;
				if (clipboardItem.type && clipboardItem.type.startsWith('image/')) {
					// For files from `e.clipboardData.files`.
					blob = clipboardItem;
					// Do something with the blob.
				} else {
					// For files from `navigator.clipboard.read()`.
					const imageTypes = clipboardItem.types ? clipboardItem.types.filter(type => type.startsWith('image/')) : [];
					for (const imageType of imageTypes) {
						blob = await clipboardItem.getType(imageType);
						// Do something with the blob.
					}
				}

				if(blob) {
					e.preventDefault();
					const base64 = await blobToBase64(blob);

					coversheetFrame.postMessage({
						custom: true,
						image: base64
					});
				}
			}
		});
	});

	function blobToBase64(blob) {
		return new Promise((resolve, _) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.readAsDataURL(blob);
		});
	}

	const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

	$: if(sigPadCanvas) {
		if(!signaturePad) {
			signaturePad = new SignaturePad(sigPadCanvas);
			sigPadContext = sigPadCanvas.getContext('2d');
		}
	}

	$: {
		if(!assignmentDate) assignmentDate = dateToYYYYMMDD(new Date());
	}

	$: {
		coversheetFrame;
		assignmentDate;
		assignmentName;
		courseName;
		section;
		instructor;
		cadets;
		shouldAddSignatureDate;
		certificationOption;
		aiCertificationOption;
		endText = endText.toUpperCase();
		rehydrateCoversheetFrame();
	}

	async function upperCaseHandler(event) {
		const { selectionStart, selectionEnd, value } = this;

		// await tick();

		assignmentName = assignmentName.toUpperCase();
		courseName = courseName.toUpperCase();
		section = section.toUpperCase();
		instructor = instructor.toUpperCase();
		cadets = cadets.toUpperCase();

		// await tick();
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
	}

	function rehydrateCoversheetFrame() {
		let dateObj = new Date(assignmentDate+"T00:00");
		let dateString = `${dateObj.getDate()} ${dateObj.toLocaleString('default', { month: 'long' }).toUpperCase()} ${dateObj.getFullYear()}`;

		cadetsErrorText = "";
		const amountOfCadets = cadets.trim().split('\n').filter(a => a).length;
		parsedCadets = amountOfCadets === 0 ? [] : cadets.split("\n").map((line, idx) => {
			try {
				let splitLine = line.trim().split(' ');
				let company = splitLine[splitLine.length - 1];
				let year = Number((splitLine[splitLine.length - 2] || '').replace(/\D/g, ''));
				let name = splitLine.slice(0, -2).join(" ");

				if(isNaN(year)) year = "XX";
				if(isNaN(Number(company[1]))) company = "XX";
				if(splitLine.length < 4) name = line;

				return [name, String(year), company];
			} catch(e) {
				// console.error(e);
				cadetsErrorText = "Invalid entry on line " + (idx + 1);
				return ["John Doe", "26", "F4"];
			}
		});
		const cadetNames = parsedCadets.map(c => {
			let arr = c[0].split(' ').filter(c => c);
			return arr;
		});
		cadetLastName = parsedCadets[0] ? parsedCadets[0][0].split(" ")[1] : "LastName";

		const cadetsText = parsedCadets.map((cadet, idx) => `CADET ${cadet[0].toUpperCase()} ‘${cadet[1].toUpperCase()}, CO ${cadet[2].toUpperCase()}`);
		const initials = cadetNames.map(cadet => cadet.length >= 2 ? `${cadet[0][0].toUpperCase()}${cadet[1][0].toUpperCase()}` : '');
		const pronoun = cadetNames.length > 1 ? "WE" : "I";

		coversheetFrame.postMessage({
			custom: true,
			state: {
				assignmentName: assignmentName ? assignmentName.toUpperCase() : "ASSIGNMENT NAME",
				course: courseName ? courseName.toUpperCase() : "COURSE ID: COURSE NAME",
				section: section ? `SECTION ${section.toUpperCase()}` : "SECTION XX",
				instructor: instructor ? instructor.toUpperCase() : "INSTRUCTOR NAME",
				cadets: cadetsText.length ? cadetsText : ["CADET JOHN DOE ‘17, CO F1"],
				date: dateString,
				pronoun: pronoun,
				certificationOption: certificationOption,
				aiCertificationOption: aiCertificationOption,
				shouldAddSignatureDate: shouldAddSignatureDate,
				initials: initials,
				endText: endText.trim()
			}
		});
	}

	function onCoversheetFrameLoad(coversheetElem){
		console.log('loaded')
		coversheetFrame = coversheetElem.contentWindow;
		rehydrateCoversheetFrame();
	}

	function dateToYYYYMMDD(date) {
		const [day, month, year] = date.toLocaleDateString('en-GB').split('/');
		return `${year}-${month}-${day}`;
	}

	function clearSigPad() {
		if(!signaturePad) return;
		signaturePad.clear();
	}

	function drawModeSigPad() {
		if(!signaturePad) return;
		sigPadContext.globalCompositeOperation = 'source-over';
	}

	function eraseModeSigPad() {
		if(!signaturePad) return;
		sigPadContext.globalCompositeOperation = 'destination-out';
	}

	function undoSigPad() {
		if(!signaturePad) return;
		let data = signaturePad.toData();
		if (data) {
			data.pop();
			signaturePad.fromData(data);
		}
	}

	function uploadSignatureClick() {
		uploadSignatureElem.click();
	}

	function prependPDFClick() {
		prependPDFFileInputElem.click();
	}

	async function downloadCoversheet() {
		const pdfFile = await getCoversheetPDF();
		const url = URL.createObjectURL(pdfFile);
		downloadURI(url, generateFileName() + '.cover.pdf');
		URL.revokeObjectURL(url);
	}

	async function handlePrependPDFUpload(event) {
		const inputFile = event.target.files[0];
		if(!inputFile) return;

		const pdfFile = await getCoversheetPDF();
		const pdfDoc = await PDFLib.PDFDocument.create();

		const coversheetFileArrayBuffer = await pdfFile.arrayBuffer();

		const coversheetPDFDoc = await PDFLib.PDFDocument.load(new Uint8Array(coversheetFileArrayBuffer));
		const pageCount = coversheetPDFDoc.getPageCount();
		for(let k = 0; k < pageCount; k++) {
			const [coversheetPDFPage] = await pdfDoc.copyPages(coversheetPDFDoc, [k]);
			pdfDoc.addPage(coversheetPDFPage);
		}

		const inputFileArrayBuffer = await inputFile.arrayBuffer();

		const donorPdfDoc = await PDFLib.PDFDocument.load(new Uint8Array(inputFileArrayBuffer));
		const docLength = donorPdfDoc.getPageCount();
		for(let k = 0; k < docLength; k++) {
			const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
			pdfDoc.addPage(donorPage);
		}

		const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
		downloadURI(pdfDataUri, generateFileName() + '.pdf');
		event.target.value = null;
	}

	async function copyHTMLToClipboard() {
		coversheetFrame.postMessage({
			custom: true,
			copyToClipboard: true
		});

		showingSuccessfulCopyText = true;
		setTimeout(() => {
			showingSuccessfulCopyText = false;
		}, 1000);
	}

	async function copyImageToClipboard() {
		const imageBlob = await getCoversheetImage();
		try {
			navigator.clipboard.write([
				new ClipboardItem({
					'image/png': imageBlob
				})
			]);
		} catch (error) {
			console.error(error);
		}

		showingSuccessfulCopyImage = true;
		setTimeout(() => {
			showingSuccessfulCopyImage = false;
		}, 1000);
	}

	function handleSignatureUpload(event) {
		const files = event.target.files;
		for (let i = 0; i < files.length; i++) {
			const file = files[i];

			const reader = new FileReader();
			reader.addEventListener("load", () => {
				const img = new Image();
				const canvas = document.createElement('canvas');
				const context = canvas.getContext('2d');

				img.onload = () => {
					canvas.width = 512;
					canvas.height = 256;

					let ratio = img.width / img.height;
					let newWidth = 512;
					let newHeight = 256;

					if(ratio > 1) {
						newWidth = canvas.width;
						newHeight = (1 / ratio) * canvas.width;
					} else {
						newWidth = ratio * canvas.height;
						newHeight = canvas.height;
					}

					canvas.width = newWidth;
					canvas.height = newHeight;

					if(ratio > 1) {
						context.drawImage(img, 0, 0, newWidth, newHeight);
					} else {
						context.drawImage(img, (canvas.width / 2) - ((ratio * canvas.height) / 2), 0, ratio * canvas.height, canvas.height);
					}
					
					savedSignatures = savedSignatures.concat([canvas.toDataURL()]);
					localStorage.setItem("SAVED_SIGNATURES", JSON.stringify(savedSignatures));
					alert("Saved signature! Go to your saved signatures to put it on your coversheet.");
				};

				img.src = reader.result;
			}, false);

			reader.readAsDataURL(file);
		}
	}

	function downloadURI(uri, name) {
		let link = document.createElement("a");
		link.download = name;
		link.href = uri;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	function addDrawingToCoversheet() {
		let drawingDataURL = signaturePad.toDataURL();
		coversheetFrame.postMessage({
			custom: true,
			image: drawingDataURL
		});
	}

	function addSavedSignatureToCoversheet(event) {
		coversheetFrame.postMessage({
			custom: true,
			image: event.target.src
		});
	}

	function getCoversheetPDF() {
		return new Promise((resolve) => {
			function listener(event) {
				if(!event.data.pdf) return;
				resolve(event.data.pdf);
				coversheetFrame.removeEventListener('message', listener);
			}
			coversheetFrame.addEventListener('message', listener);
			coversheetFrame.postMessage({
				custom: true,
				getPDF: true
			});
		});
	}

	function getCoversheetImage() {
		return new Promise((resolve) => {
			function listener(event) {
				if(!event.data.return_image) return;
				resolve(event.data.return_image);
				coversheetFrame.removeEventListener('message', listener);
			}
			coversheetFrame.addEventListener('message', listener);
			coversheetFrame.postMessage({
				custom: true,
				getCoversheetImage: true
			});
		});
	}

	function deleteSavedSignature(event) {
		event.preventDefault();
		savedSignatures.splice(event.target.dataset.idx, 1);
		savedSignatures = savedSignatures;
		localStorage.setItem("SAVED_SIGNATURES", JSON.stringify(savedSignatures));
	}

	function generateFileName() {
		return `${capitalize(cadetLastName)}_${courseName.split(":")[0]}_${assignmentName}`;
	}

	function showPrintDialog() {
		document.title = generateFileName() + '.cover';
		coversheetFrame.print();
		document.title = "Coversheet Generator (CSG)";
	}

	function saveSignature() {
		savedSignatures = savedSignatures.concat([signaturePad.toDataURL()]);
		localStorage.setItem("SAVED_SIGNATURES", JSON.stringify(savedSignatures));
		alert("Saved signature!");
	}

	function getSavedSignatures() {
		let item = localStorage.getItem("SAVED_SIGNATURES");

		if(!item) {
			localStorage.setItem("SAVED_SIGNATURES", "[]");
			return getSavedSignatures();
		}

		return JSON.parse(item);
	}
</script>

<style type="text/css">
	::-webkit-scrollbar {
		width: 8px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}

	:global(.autocomplete.select) {
		width: 100%;
	}

	.footer {
		width: 100%;
		margin-top: 1rem;
		position: static;
		background-color: white;
		border-top: 1px solid #eee;
	}

	.images-container {
		height: 50vh;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.images-container .images-scroll {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		padding: 1rem;
	}

	.saved-signature-img {
		display: block;
		border: 1px solid gray;
		border-radius: 10px;
		margin-bottom: 0.25rem;

		cursor: pointer;
		transform: scale(1);
		transition: all 75ms ease;
	}

	.saved-signature-img img {
		width: 100%;
	}

	.saved-signature-img .close-btn {
		position: absolute;
		right: 0;
		line-height: 24px;
		top: 0;
		transform: scale(1);
		color: #ccc;
		transition: all 75ms ease;
	}

	.saved-signature-img .close-btn:hover {
		color: #666;
		transform: scale(1.02);
	}

	.saved-signature-img:hover {
		transform: scale(1.02);
	}

	#drawModal {
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.signature-pad {
		display: block;
		margin: 0 auto;
		border: 1px solid black;
	}

	.logo {
		width: 50%;
	}
</style>

<div class="container mt-4">
	<div class="row">
		<div class="col-md-8">
			<img class="logo d-block mx-auto" src="/csg_long.svg" />
			<hr class="mb-2" />
			<p class="text-center mb-2 mt-0">
				<span class="{isNewUpdate ? 'animate__animated animate__flash animate__infinite' : ''}" on:click={() => isNewUpdate = false}>
					<a class="text-secondary w-100" href="/info" target="_blank">Info / Help / Changelog</a>
				</span>
				<span class="text-primary"> • </span>
				<a class="text-secondary w-100" href="https://usarmywestpoint.sharepoint.com/sites/g5.publications/publications/DOCUMENTATION%20AND%20ACKNOWLEDGMENT%20OF%20ACADEMIC%20WORK.pdf" target="_blank">DAAW PDF</a>
				<span class="text-primary"> • </span>
				<a class="text-secondary w-100" href="https://citethedaw.netlify.app/" target="_blank">Citation Generator</a>
				<span class="text-primary"> • </span>
				<a class="text-secondary w-100" href="https://corpstools.canny.io/feedback" target="_blank">Feedback</a>
			</p>
			<div class="card wrapper-card">
				<div class="card-body">
					<Coversheet onLoaded={onCoversheetFrameLoad} bind:this={coversheetComponent} />
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<CorpsCard />
			<div class="card wrapper-card">
				<div class="card-body">
					<div class="mb-1">
						<AutoComplete items={COURSE_NAMES} bind:text={courseName} maxItemsToShowInList={6} placeholder="Course Name">
							<div slot="dropdown-footer" let:nbItems let:maxItemsToShowInList>
								<hr class="dropdown-divider">
								{#if nbItems - maxItemsToShowInList > 0}
									<span class="text-muted ms-3">… {nbItems - maxItemsToShowInList} courses not shown</span>
								{/if}
							</div>
						</AutoComplete>
					</div>
					<div class="input-group mb-1">
						<span class="input-group-text" id="assignmentNameInput">Assignment</span>
						<input type="text" class="form-control" bind:value={assignmentName} on:keydown={upperCaseHandler} on:keyup={upperCaseHandler} placeholder="Problem Set 1" aria-label="Problem Set 1" aria-describedby="assignmentNameInput">
					</div>
					<div class="input-group mb-1">
						<span class="input-group-text" id="sectionNameInput">Section</span>
						<input type="text" class="form-control me-1" bind:value={section} on:keydown={upperCaseHandler} on:keyup={upperCaseHandler} placeholder="Section" aria-label="J2" aria-describedby="sectionNameInput">
					</div>
					<div class="input-group mb-1">
						<span class="input-group-text" id="sectionNameInput">Instructor</span>
						<input type="text" class="form-control" bind:value={instructor} on:keydown={upperCaseHandler} on:keyup={upperCaseHandler} placeholder="Instructor" aria-label="COL John Doe" aria-describedby="instructorInput">
					</div>
					<div class="input-group">
						<span class="input-group-text" id="dateInput">Date</span>
						<input type="date" class="form-control" bind:value={assignmentDate} aria-describedby="dateInput">
						<span class="input-group-text" id="signatureDateCheckLabel">Signature?</span>
						<div class="input-group-text">
							<input class="form-check-input mt-0" type="checkbox" bind:checked={shouldAddSignatureDate}>
						</div>
					</div>
					<hr />
					<div class="mb-2">
						<label for="cadetsInput" class="form-label">Cadets <small class="text-muted">[Full Name] [Year] [Company]</small></label>
						<textarea class="form-control" id="cadetsInput" bind:value={cadets} on:keydown={upperCaseHandler} on:keyup={upperCaseHandler} placeholder="John Doe 26 I1
Jane Roe 26 D2"></textarea>
						<!-- <p class="text-danger">{cadetsErrorText}</p> -->
					</div>
					<div class="">
						<label for="endTextInput" class="form-label">End Text</label>
						<textarea class="form-control" id="endTextInput" bind:value={endText} on:keydown={upperCaseHandler} on:keyup={upperCaseHandler} placeholder="WORD COUNT: 9999"></textarea>
					</div>
					<div class="mt-2">
						<div class="input-group mb-0">
							<select class="form-select" id="citationSelect" bind:value={certificationOption}>
								<option value="used" selected>{pronoun} used sources</option>
								<option value="unused">{pronoun} did not use sources</option>
								<option value="none">[Leave Blank]</option>
							</select>
							<label class="input-group-text" for="citationSelect">and</label>
							<select class="form-select" id="citationSelect" bind:value={aiCertificationOption}>
								<option value="used">used AI.</option>
								<option value="unused" selected>did not use AI.</option>
								<option value="none">[Leave Blank]</option>
							</select>
						</div>
						<!-- <div class="input-group input-group-sm mb-0 w-100">
							<span class="input-group-text" id="didUseSourcesCheck">Place Initials?</span>
							<div class="input-group-text">
								<input class="form-check-input mt-0" type="checkbox" id="didUseSourcesCheck" bind:checked={didUseSources}>
							</div>
							<span class="input-group-text" id="didUseSourcesCheck">Used Sources?</span>
							<div class="input-group-text">
								<input class="form-check-input mt-0" type="checkbox" id="didUseSourcesCheck" bind:checked={didUseSources}>
							</div>
						</div> -->
					</div>
					<hr />
					<div class="btn-group w-100 image-control-group" role="group" aria-label="Basic example">
						<button type="button" class="btn btn-warning" on:click={uploadSignatureClick}>Upload</button>
						<input type="file" class="btn btn-warning" bind:this={uploadSignatureElem} on:change={handleSignatureUpload} accept="image/*" hidden>
						<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#drawModal">Draw</button>
						<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#savedModal">Saved</button>
					</div>
					<p class="text-muted text-center mb-0 mt-2">Right-click signatures to delete.</p>
					<hr />
					<div class="btn-group w-100" role="group" aria-label="Basic example">
						<button
							type="button" class="btn btn-warning" on:click={downloadCoversheet}
							data-bs-toggle="tooltip" data-bs-title="Downloads the Coversheet PDF."
						>Download</button>
						<button
							type="button" class="btn btn-dark" on:click={showPrintDialog}
							data-bs-toggle="tooltip" data-bs-title="Opens the print window."
						>Print</button>
						<input type="file" bind:this={prependPDFFileInputElem} on:change={handlePrependPDFUpload} accept="application/pdf" hidden>
						<button
							type="button" class="btn btn-secondary" on:click={prependPDFClick}
							data-bs-toggle="tooltip" data-bs-title="Upload a PDF File to prepend the coversheet too."
						>Prepend</button>
					</div>
					<div class="btn-group w-100 mt-2" role="group" aria-label="Basic example">
						<button
							type="button" class="btn btn-secondary" on:click={copyImageToClipboard}
							data-bs-toggle="tooltip" data-bs-title="Copies the coversheet (as an image) to your clipboard to paste into your Word document. May be more consistent than text."
							disabled={showingSuccessfulCopyImage}
						>{showingSuccessfulCopyImage ? "Copied!" : "Clipboard (Image)"}</button>
						<button
							type="button" class="btn btn-secondary" on:click={copyHTMLToClipboard}
							data-bs-toggle="tooltip" data-bs-title="Copies the coversheet (as text) to your clipboard to paste into your Word document."
							disabled={showingSuccessfulCopyText}
						>{showingSuccessfulCopyText ? "Copied!" : "Clipboard (Text)"}</button>
					</div>
					<hr />
					<p class="text-center text-muted m-0">Developed by CDT Korbin Deary, Class of '26</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="drawModal" tabindex="-1" aria-labelledby="drawModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="drawModalLabel">Draw</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<canvas id="signature-pad" class="signature-pad mb-3" width="512" height="256" bind:this={sigPadCanvas}></canvas>
				<div class="d-block mx-auto w-75">
					<div class="btn-group w-100" role="group" aria-label="Basic example">
						<button type="button" class="btn btn-secondary" on:click={clearSigPad}>Clear</button>
						<button type="button" class="btn btn-secondary" on:click={drawModeSigPad}>Draw</button>
						<button type="button" class="btn btn-secondary" on:click={eraseModeSigPad}>Erase</button>
						<button type="button" class="btn btn-secondary" on:click={undoSigPad}>Undo</button>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-warning btn-lg w-75 mx-auto d-block" data-bs-dismiss="modal" on:click={addDrawingToCoversheet}>Add to Coversheet</button>
				<button type="button" class="btn btn-success" on:click={saveSignature}>Save Signature</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="savedModal" tabindex="-1" aria-labelledby="savedModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="savedModalLabel">Saved Signatures</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="images-container">
					<div class="images-scroll">
						{#if savedSignatures.length === 0}
							<span class="text-muted text-center w-100 d-block"><i>No Saved Signatures</i></span>
						{:else}
							{#each savedSignatures as url, i}
								<div class="saved-signature-img">
									<span class="close-btn btn-close" data-idx={i} on:click={deleteSavedSignature}></span>
									<img src={url} data-idx={i} data-bs-dismiss="modal" on:click={addSavedSignatureToCoversheet} />
								</div>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>