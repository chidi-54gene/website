var content;
    var state = {
      'page': 1,
      'rows': 3,
      'window': 5
    }

    $.ajax({ //create an ajax request to display.php
      type: "GET",
      url: "https://api2.54gene.com/api/v1/events/all",
      // dataType: "html",                
      success: function (response) {

        state['querySet'] = response.data;
        buildEventList(state.querySet, state.page);

      }

    });

    function pagination(querySet, page, rows) {

      var trimStart = (page - 1) * rows;
      var trimEnd = trimStart + rows;

      var trimData = querySet.slice(trimStart, trimEnd);
      var pages = Math.ceil(querySet.length / rows);

      return {
        'querySet': trimData,
        pages: pages
      }

    }

    function pageButtons(pages) {
        var wrapper = document.querySelector('#pagination-button');
        wrapper.innerHTML = '';

        var maxLeft = (state.page - Math.floor(state.window / 2));
        var maxRight = (state.page + Math.floor(state.window / 2));

        if (maxLeft < 1) {
            maxLeft = 1;
            maxRight = state.window;
        }

        if (maxRight > pages) {
            maxLeft = pages - (state.window - 1);
            maxRight = pages;

            if (maxLeft < 1) {
                maxLeft = 1;
            }
        }

        for (let page = maxLeft; page <= maxRight; page++) {
          
          wrapper.innerHTML += `<button value=${page} class="btn btn-sm btn-info page" id=button${page}> ${page} </button>`;  

        }

        if (state.page != 1) {
            wrapper.innerHTML = `<button value=${1} class="btn btn-sm btn-info page"> &#171; First </button>` + wrapper.innerHTML;  
        }

        if (state.page != pages) {
            wrapper.innerHTML += `<button value=${pages} class="btn btn-sm btn-info page">  Last &#187;</button>`;  
        }

        $('.page').on('click', function() {
          $("#news-append").empty();
          state.page = $(this).val();
          buildEventList(state.querySet, state.page);
          
        })
    }

    function buildEventList(eventsData, activePage) {

      var eventsData = pagination(state.querySet, state.page, state.rows);

      console.log(eventsData);

      $.each(eventsData.querySet, function (index, events) {

        var info;

        if (events.additonal_info != null) {
          info = events.additonal_info.substring(0, 50) + "...";
        } else {
          info = "";
        }

        content = `<div class="card mb-5 events-card" style="max-width: 900px; margin-top: 5%;">
                        <div class="row g-0">
                          <div class="col-md-3" style="padding: 0px;">
                            <img src="${events.image}" class="img-fluid event-image" alt="...">
                          </div>
                          <div class="col-md-9">
                            <div class="card-body" style="padding-left: 0px; padding-right: 0px; padding-top: 0px; padding-bottom: 5%;">
                              <p class="event-p" style="font-size: 13px;"><b>${events.title}: </b> ${info}</p>
                              <div class="event-loc-div" style="margin-top: 0px;">
                                <div class="mt-3"><img src="images/time.svg" class="mr-2"></img>
                                  <a style="font-size: 10px; margin-right: 10px;">${events.start_date} - ${events.end_date}</a></div><br class="mobile-break">
                                  <div class="mt-3"><img src="images/location.svg" class="mr-2"></img><a
                                    style="font-size: 10px;">${events.location}</a></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>`;

        $("#news-append").append(content);
        pageButtons(eventsData.pages);
        var activeButton = document.querySelector(`#button${activePage}`);
        $(activeButton).addClass('active-btn');

      });


    }