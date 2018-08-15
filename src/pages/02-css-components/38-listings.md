---

title: Listings
name: listings
category: components
subcategory: Molecules
layout: q+tq
id: listings-page

---


<div class="lead"><p>For when we need to show a list of items, for news articles, events listings, search results, and so on.</p></div>

### Simplest example

<script>
component("listings", { "atoms": [
  { "listings-item": {
    title: "An example listing",
    link: "#"
  } },
  { "listings-item": {
    title: "An example listing",
    link: "#"
  } }
]});
</script>

### Simple example

<script>
component("listings", { "atoms": [
  { "listings-item": {
    title: "An example listing",
    description: "A description of some sort which gives the reader an idea of what the listing is about.",
    link: "#"
  } },
  { "listings-item": {
    title: "An example listing",
    description: "A description of some sort which gives the reader an idea of what the listing is about.",
    link: "#"
  } }
]});
</script>

### News article example

<script>
component("listings", { "atoms": [
  { "listings-item": {
    type: "news",
    icon: "newspaper-o",
    date: "27 January 2018",
    title: "An example news listing",
    description: "A description of some sort which gives the reader an idea of what the listing is about.",
    link: "#"
  } },
  { "listings-item": {
    type: "news",
    icon: "newspaper-o",
    date: "27 January 2018",
    title: "An example news listing",
    description: "A description of some sort which gives the reader an idea of what the listing is about.",
    link: "#"
  } }
]});
</script>

### News with media example

<script>
component("listings", { "atoms": [
  { "listings-item": {
    type: "news",
    icon: "newspaper-o",
    date: "27 January 2018",
    title: "An example news listing",
    media: {
      object: "traffic-thumbnail.jpg",
      text: "Vehicle for success"
    },
    description: "A description of some sort which gives the reader an idea of what the listing is about. A major public lecture in York's historic Merchant Adventurers' Hall will explore the explosive and exciting combination of the visual arts and the sport of wrestling.",
    link: "#"
  } },
  { "listings-item": {
    type: "news",
    icon: "newspaper-o",
    date: "27 January 2018",
    title: "An example news listing",
    media: {
      object: "traffic-thumbnail.jpg",
      text: "Vehicle for success"
    },
    description: "A description of some sort which gives the reader an idea of what the listing is about. A major public lecture in York's historic Merchant Adventurers' Hall will explore the explosive and exciting combination of the visual arts and the sport of wrestling.",
    link: "#"
  } }
]});
</script>

### Event example

<script>
component("listings", { "atoms": [
  { "listings-item": {
    type: "event",
    icon: "calendar-o",
    date: "6 February 2018 10:00am",
    title: "An example event listing",
    description: "A description of some sort of event that is happening somewhere and is about something.",
    link: "#"
  } },
  { "listings-item": {
    type: "event",
    icon: "calendar-o",
    date: "6 February 2018 10:00am",
    title: "An example event listing",
    description: "A description of some sort of event that is happening somewhere and is about something.",
    link: "#"
  } }
]});
</script>

### Event with media example

<script>
component("listings", { "atoms": [
  { "listings-item": {
    type: "event",
    icon: "calendar-o",
    date: "6 February 2018 10:00am",
    title: "An example news listing",
    media: {
      object: "traffic-thumbnail.jpg",
      text: "Vehicle for success"
    },
    description: "A description of some sort which gives the reader an idea of what the listing is about.",
    link: "#"
  } },
  { "listings-item": {
    type: "event",
    icon: "calendar-o",
    date: "6 February 2018 10:00am",
    title: "An example news listing",
    media: {
      object: "traffic-thumbnail.jpg",
      text: "Vehicle for success"
    },
    description: "A description of some sort which gives the reader an idea of what the listing is about.",
    link: "#"
  } }
]});
</script>

### Generic search result example

<script>
component("listings", { "atoms": [
  { "listings-item": {
    title: "Art on campus - About the University",
    description: "From the Norman Rea Gallery to the various sculptures, the campus at York provides a wide variety of art, in all its forms.",
    link: "#",
    url: "  york.ac.uk/about/campus/art/"
  } },
  { "listings-item": {
    title: "Art on campus - About the University",
    description: "From the Norman Rea Gallery to the various sculptures, the campus at York provides a wide variety of art, in all its forms.",
    link: "#",
    url: "  york.ac.uk/about/campus/art/"
  } }
]});
</script>

### Best bet example (highlighted result)

<script>
component("listings", { "atoms": [
  { "listings-item": {
      title: "Art on campus - About the University",
      description: "From the Norman Rea Gallery to the various sculptures, the campus at York provides a wide variety of art, in all its forms.",
      link: "#",
      url: "  york.ac.uk/about/campus/art/",
      highlighted: true
  } },
  { "listings-item": {
      title: "Art on campus - About the University",
      description: "From the Norman Rea Gallery to the various sculptures, the campus at York provides a wide variety of art, in all its forms.",
      link: "#",
      url: "  york.ac.uk/about/campus/art/",
      highlighted: true
  } }
]});
</script>

### Search result (news article) example

<script>
component("listings", { "atoms": [
  { "listings-item": {
    type: "news",
    icon: "newspaper-o",
    date: "27 January 2018",
    title: "Wrestling with art",
    description: "A major public lecture in York's historic Merchant Adventurers' Hall will explore the explosive and exciting combination of the visual arts and the sport of wrestling.",
    link: "#",
    url: "  york.ac.uk/news-and-events/news/2012/events/wrestling-with-art/"
  } },
  { "listings-item": {
    type: "news",
    icon: "newspaper-o",
    date: "27 January 2018",
    title: "Wrestling with art",
    description: "A major public lecture in York's historic Merchant Adventurers' Hall will explore the explosive and exciting combination of the visual arts and the sport of wrestling.",
    link: "#",
    url: "  york.ac.uk/news-and-events/news/2012/events/wrestling-with-art/"
  } }
]});
</script>


### Options

#### Atoms

* listings-item
  * **title**: the title of the list **(required)**
  * **link**: the URL of the listing target **(required)**
  * **description**: a description of the listing
  * **type**: what kind of listing is it?  News, Event, Search result, etc.
  * **icon**: an icon to display before 'type'
  * **date**: the date and time of an event or a news article published date
  * **media**: an image that can accompany a news article
  * **mediaText**: alt text for the an image (for use with 'media')
  * **url**: the URL to display on a listing if it is a search result
  * **highlighted**: if the listing items should be highlighted (see Best Bet section above)

#### Molecules

* listings
  * **atoms**: an array of listings-item atoms
