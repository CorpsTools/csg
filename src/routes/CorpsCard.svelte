<script>
	import { onMount } from 'svelte';
	import ADVERTISEMENTS from './ADVERTISEMENTS.js';
	let shuffledAds = [];

	onMount(() => {
		shuffledAds = Array.from(ADVERTISEMENTS).filter(ad => {
			return new Date() > ad.startDate && new Date() < ad.endDate;
		});
		shuffle(shuffledAds);

		if(shuffledAds.length === 0) shuffledAds.push({
			emailPOC: "korbin.deary@westpoint.edu",
			imageURL: "https://placehold.co/600x200",
			startDate: new Date("August 26 2020"),
			endDate: new Date("December 26 2099"),
			actionLink: "https://corps.tools"
		});

		const myCarouselElement = document.querySelector('#corpsCarousel');
		const carousel = new bootstrap.Carousel(myCarouselElement, {
			interval: 5000
		});
	});

	function shuffle(array) {
		let currentIndex = array.length;

		// While there remain elements to shuffle...
		while (currentIndex != 0) {
			// Pick a remaining element...
			let randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
		}
	}
</script>

<style type="text/css">
	.corps-card {
		margin-bottom: 1.5rem;
		border-radius: 0;
		aspect-ratio: 3 / 1;
	}

	#corpsCarousel {
		
	}

	#corpsCarousel .carousel-indicators {
		margin-bottom: -4px;
		opacity: 0.75;
	}

	.info-button {
		position: absolute;
		top: -23px;
		left: 0px;
/*		width: 130px;*/
		height: 20px;
		border: 1px solid #eee;
		border-radius: 4px;
		display: flex;
		align-items: center;

		font-size: 0.8rem;

		cursor: pointer;
	}

	.info-button svg {
/*		width: 100%;*/
		margin-left: 8px;
	}

	.info-button p {
		width: 100%;
		margin: 0;
		margin-left: 8px;
		margin-right: 8px;
	}

	#corpsCarousel .carousel-control-prev, #corpsCarousel .carousel-control-next {
		transform: scale(0);
		transition: all 100ms ease;
	}

	#corpsCarousel:hover .carousel-control-prev, #corpsCarousel:hover .carousel-control-next {
		transform: scale(0.75);
	}

	.carousel-indicators {
		transform: scale(0.6);
	}

	#corpsCarousel .carousel-caption {
		color: black;
		opacity: 0;
		padding: 0;
		top: 0;
		transition: all 250ms ease;
		pointer-events: none;
	}

	#corpsCarousel:hover .carousel-caption {
		opacity: 0.75;
	}
	
</style>

<div class="card wrapper-card corps-card">
	<div class="info-button" data-bs-toggle="modal" data-bs-target="#adInfoModal">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
			<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
			<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
		</svg>
		<p>What is CorpsCard?</p>
	</div>
	<div id="corpsCarousel" class="carousel slide" data-bs-ride="carousel">
		<div class="carousel-indicators">
			{#each shuffledAds as ad, index}
				<button type="button" data-bs-target="#corpsCarousel" data-bs-slide-to="{index}" class="{index === 0 ? 'active' : ''}"></button>
			{/each}
		</div>
		<div class="carousel-inner">
			{#each shuffledAds as ad, index}
				<div class="{'carousel-item' + (index === 0 ? ' active' : '')}">
					<a href={ad.actionLink} target="_blank" data-bs-toggle="{ad.isPlaceholder ? 'modal' : ''}" data-bs-target="{ad.isPlaceholder ? '#adInfoModal' : ''}">
						<img src={ad.imageURL} class="d-block w-100">
					</a>
					<div class="carousel-caption d-none d-md-block">
						<p class="m-0" style="pointer-events: auto;">{ad.emailPOC}</p>
					</div>
				</div>
			{/each}
		</div>
		<button class="carousel-control-prev" type="button" data-bs-target="#corpsCarousel" data-bs-slide="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Previous</span>
		</button>
		<button class="carousel-control-next" type="button" data-bs-target="#corpsCarousel" data-bs-slide="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Next</span>
		</button>
	</div>
	<p class="text-muted mb-0 text-center" style="font-size: 0.75rem">CorpsTools is NOT affiliated with the content of the CorpsCards above.</p>
</div>

<div class="modal fade" id="adInfoModal" tabindex="-1" aria-labelledby="adInfoModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered">
		<div class="modal-content">
			<!-- Header -->
			<div class="modal-header">
				<h5 class="modal-title" id="adInfoModalLabel">CorpsCard Advertisement Guidelines</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>

			<!-- Body -->
			<div class="modal-body">
				<p>
					Cadets can submit advertisements to be featured in the ad carousel. 
					Please review the following requirements before submitting:
				</p>
				<ul class="list-group list-group-flush">
					<li class="list-group-item"><strong>Cost:</strong> $5 minimum per advertisement (pay as much as you want, just has to be at least five dollars.)</li>
					<li class="list-group-item"><strong>Duration:</strong> Ads can remain live for up to <strong>7 days</strong></li>
					<li class="list-group-item"><strong>Proceeds:</strong> All proceeds go to the continuation of <em>CorpsTools</em>, our parent organization</li>
					<li class="list-group-item"><strong>Content:</strong> Advertisements must be professional, respectful, and related to USMA</li>
					<li class="list-group-item"><strong>Images:</strong> Ad pictures must be in a <strong>3:1 ratio</strong> with a minimum resolution of <strong>600x200</strong></li>
					<li class="list-group-item"><strong>PoC:</strong> All ads must have a point-of-contact email associated with it.</li>
					<li class="list-group-item"><strong>Links:</strong> Do not put QR codes in your ads; Submit a hyperlink to redirect cadets when your ad is clicked. Link is optional.</li>
					<!-- <li class="list-group-item"><strong>Capacity:</strong> A maximum of 10 advertisements will be displayed on the carousel at once</li> -->
				</ul>
				<hr />
				<p class="text-center">Click below to submit a card.</p>
				<a class="btn btn-warning w-100 text-center btn-lg" href="https://forms.office.com/r/SP49Wa30yH" target="_blank">Submit a CorpsCard Advertisement</a>
			</div>
		</div>
	</div>
</div>