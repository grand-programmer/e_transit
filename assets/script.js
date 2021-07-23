$("body").on("keyup", "form", function (e) {
  if (e.which == 13) {
    if ($("#dec-section #next").is(":visible") && $("#dec-section fieldset.current").find("input,textarea").valid()) {
      e.preventDefault();
      nextSection();
      return false;
    }
  }
});


$("#dec-section #next").on("click", function (e) {
  nextSection();
});

$("#dec-section form").on("submit", function (e) {
  if ($("#dec-section #next").is(":visible") || $("#dec-section fieldset.current").index() < 4) {
    e.preventDefault();
  }
});

function goToSection(i) {
  $("#dec-section fieldset:gt(" + i + ")").removeClass("current").addClass("next");
  $("#dec-section fieldset:lt(" + i + ")").removeClass("current");
  // $("#dec-section li").eq(i).addClass("activated");
  $("#dec-section li").eq(i).addClass("current").siblings().removeClass('current');
  setTimeout(function () {
    $("#dec-section fieldset").eq(i).removeClass("next").addClass("current active");
    if ($("#dec-section fieldset.current").index() == 4) {
      $("#dec-section #next").hide();
      $("#dec-section input[type=submit]").show();
    } else {
      $("#dec-section #next").show();
      $("#dec-section input[type=submit]").hide();
    }
  }, 80);

}

function nextSection() {
  var i = $("#dec-section fieldset.current").index();
  if (i < 3) {
    $("#dec-section li").eq(i + 1).addClass("last active").siblings().removeClass('last');
    goToSection(i + 1);
  }
}

$("#dec-section #section-tabs li").on("click", function (e) {
  var i = $(this).index();
  if ($(this).hasClass("active")) {
    goToSection(i);
  } else {
    alert("Please complete previous sections first.");
  }
});
$(document).ready(function () {
  $("fieldset.current").on("click", ".transport-item", function (e) {
    $(".transport-turi").addClass("d-none");
    $("." + $(this).data("transport-id")).first().removeClass("d-none");
    $("#next").removeClass("d-none");
  });

  $("#yangi_tirkama_content form").on("submit", function (e) {
    e.preventDefault();
    //// some Ajax functions
    $("#yangi_tirkama_content").modal('hide');
    var cloned_tirkama_el = $(".added_tirkama").first().clone(true);
    cloned_tirkama_el.find(".added_tirkama_content").attr('data-target',".tirkama_modal"+($('.added_tirkama').length +1));
    cloned_tirkama_el.find(".modal").addClass("tirkama_modal"+($('.added_tirkama').length +1));
    $(".tirkamalar").first().append(cloned_tirkama_el);
    $(".tirkamalar").find(".added_tirkama").last().removeClass("d-none");

  });
  $(".added_tirkama span.remove-button").on("click", function (e) {
    $(e.target).closest(".added_tirkama").remove();
  });
  $("#yangi_haydovchi_content form").on("submit", function (e) {
    e.preventDefault();
    //// some Ajax functions
    $("#yangi_haydovchi_content").modal('hide');
    var cloned_haydovchi_el = $(".added_haydovchi").first().clone(true);
    cloned_haydovchi_el.find('.added_haydovchi_content').attr('data-target','#haydovchi_content'+ ($(".added_haydovchi").length + 1));
    cloned_haydovchi_el.find('.modal').attr('id','haydovchi_content'+ ($(".added_haydovchi").length + 1));
    $(".haydovchilar").first().append(cloned_haydovchi_el);
    $(".haydovchilar").find(".added_haydovchi").last().removeClass("d-none");

  });
  $(".added_haydovchi span.remove-button").on("click", function (e) {
    $(e.target).closest(".added_haydovchi").remove();
  });


  $(".manzil_postlar").select2(
    {
      allowClear: false,
      escapeMarkup: function (markup) {
        return markup;
      },/*
      language: {
        noResults: function () {
          return "<a href='http://google.com/'>Add</a>";
        }
      }*/
    });

  $('.tirkama_ruy_davlat').closest('.modal').on('shown.bs.modal', function (e) {
    $(this).find(".tirkama_ruy_davlat").select2({
      dropdownParent: $(this)
    });
  })
  $('.nationality').closest('.modal').on('shown.bs.modal', function (e) {
    $(this).find(".nationality").select2({
      dropdownParent: $(this)
    });
  })
  $('.modal').on('show.bs.modal', function (e) {
    $('.modal').focus();
  })

  function invoice_scripts(invoice_number="") {
  $("#"+invoice_number+" .show-more").click(function () {
    if (!$(this).hasClass('active')) {

      $("#"+invoice_number+" .invoice-data .form-item label:nth-child(n+4)").addClass("d-none").animate("", 5);
      $("#"+invoice_number+" .invoice-data .form-item input:nth-child(n+4)").addClass("d-none").animate("", 5);
      $(this).addClass("active").animate("", 5);
      $(this).find('span:nth-child(2)').addClass("d-none").animate("", 5);
      $(this).find('span:nth-child(1)').removeClass("d-none").animate("", 5);
      $("#"+invoice_number+" .invoice-data > .row").addClass("active").animate("", 5);


    } else {
      $("#"+invoice_number+" .invoice-data .form-item label").removeClass("d-none").animate("", 5);
      $("#"+invoice_number+" .invoice-data .form-item input").removeClass("d-none").animate("", 5);
      $(this).removeClass("active").animate("", 5);
      $(this).find('span:nth-child(1)').addClass("d-none").animate("", 5);
      $(this).find('span:nth-child(2)').removeClass("d-none").animate("", 5);
      $("#"+invoice_number+" .invoice-data > .row").removeClass("active").animate("", 5);
    }
  })

  if ($("#"+invoice_number).length>0){
    // Single Select
    var autocomplete = $("#" + invoice_number + " .dropdown-block.sender input[name=sender]").autocomplete({
      source: [
        {label: "Sardor Co.Ltd", value: "1"},
        {label: "Union Co.Ltd", value: "2"},
        {label: "Frsh Co.Ltd", value: "3"},
        {label: "Comp Co.Ltd", value: "3"},
      ],
      select: function (event, ui) {
        // Set selection
        //$('.dropdown-block.sender input').val(ui.item.label); // display the selected text
        $('#' + invoice_number + ' .dropdown-block.sender input[name=sender]').hide(); // display the selected text
        $('#' + invoice_number + ' .dropdown-block.sender .selected_sender').removeClass("d-none"); // display the selected text
        $('#' + invoice_number + ' .dropdown-block.sender .selected_sender').find(".sender-value").text(ui.item.label); // display the selected text
        $('#' + invoice_number).find(".yuboruvchi").html("<p>" +(ui.item.label)+"</p>"); // display the selected text



        return false;
      },
      focus: function (event, ui) {
        //$(this).data("uiAutocomplete").search($(this).val());
        //$( ".dropdown-block.sender input" ).val( ui.item.label );
        return false;
      },
      response: function (event, ui) {

        var noResult = {value: "no-results", label: "Қўшиш"};
        ui.content.push(noResult);
      },
      create: function (event, ui) {
        $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
          var Listitem;
          if (item.value == "no-results") {
            Listitem = $('<li>').append('<div id="ui-id-" tabindex="-1" class="ui-menu-item-wrapper"  data-toggle="modal" data-target=".sender-modal">' + item.label + '</div>').addClass("add");
          } else
            Listitem = $('<li>').append('<div id="ui-id-" tabindex="-1" class="ui-menu-item-wrapper">' + item.label + '</div>');
          return Listitem.appendTo(ul);
        };
      },
      minLength: 0
    }).bind('focus', function () {
      if (!$(this).val().trim())
        $(this).keydown();
    });
  $("#" + invoice_number + " .dropdown-block.receiper > input").autocomplete({
    source: [
      {label: "Sardor Co.Ltd", value: "1"},
      {label: "Union Co.Ltd", value: "2"},
      {label: "Frsh Co.Ltd", value: "3"},
      {label: "Comp Co.Ltd", value: "3"}
    ],
    select: function (event, ui) {
      // Set selection
      //$('.dropdown-block.sender input').val(ui.item.label); // display the selected text
      $('#' + invoice_number + ' .dropdown-block.receiper input[name=receiper]').hide(); // display the selected text
      $('#' + invoice_number + ' .dropdown-block.receiper .selected_receiper').removeClass("d-none"); // display the selected text
      $('#' + invoice_number + ' .dropdown-block.receiper .selected_receiper').find(".receiper-value").text(ui.item.label); // display the selected text
      $('#' + invoice_number).find(".qabulqiluvchi").html("<p>" +(ui.item.label)+"</p>"); // display the selected text

      return false;
    },
    focus: function (event, ui) {
      //$(this).data("uiAutocomplete").search($(this).val());
      //$( ".dropdown-block.sender input" ).val( ui.item.label );
      return false;
    },
    response: function (event, ui) {

      var noResult = {value: "no-results", label: "Қўшиш"};
      ui.content.push(noResult);
    },
    create: function (event, ui) {
      $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
        var Listitem;
        if (item.value == "no-results") {
          Listitem = $('<li>').append('<div id="ui-id-" tabindex="-1" class="ui-menu-item-wrapper"  data-toggle="modal" data-target=".receiper-modal">' + item.label + '</div>').addClass("add");
        } else
          Listitem = $('<li>').append('<div id="ui-id-" tabindex="-1" class="ui-menu-item-wrapper">' + item.label + '</div>');
        return Listitem.appendTo(ul);
      };
    },
    minLength: 0,
  }).bind('focus', function () {
    if (!$(this).val().trim())
      $(this).keydown();
  });
  $("#" + invoice_number +" .ui-menu-item:last-child").append('<li class="ui-menu-item"><div id="ui-id-25" tabindex="-1" class="ui-menu-item-wrapper">Comp Co.Ltd</div></li>');
  $("#" + invoice_number +" .selected_sender i").click(function () {
    $('#' + invoice_number + ' .dropdown-block.sender input').show().focus(); // display the selected text
    $('#' + invoice_number + ' .dropdown-block.sender .selected_sender').addClass("d-none"); // display the selected text

  })
  $("#" + invoice_number +" .selected_receiper i").click(function () {
    $('#' + invoice_number + ' .dropdown-block.receiper input').show().focus(); // display the selected text
    $('#' + invoice_number + ' .dropdown-block.receiper .selected_receiper').addClass("d-none"); // display the selected text

  })

    $("[data-toggle=popover]").popover({
      container: '.content.freights'
    });

  $("#" + invoice_number +" .fileuploader").uploadFile({
    url: "/upload.php",
    multiple: true,
    dragDrop: true,
    fileName: "myfile",
    maxFileCount: 5,
    showDelete: true,
    maxFileSize: 10000 * 1024,
    uploadStr: "Юклаш",
    dragDropStr: "<span><b>Файлларни олиб шу ерга ташланг!</b></span> ",
    deleteStr: "Ўчириш",
    showDownload: true,
    showProgress: false,
    showUploadProgress: false,
    downloadStr: "Сақлаш",
    extraHTML:function()
    {
      var html = "<div><div class='row'><label class='col-8 float-left'>Ҳужжат турини белгиланг:</label><select name='document_type' class='form-control col-3 float-left'><option value='1'>СМР</option><option value='2'>Инвоис</option></select></div>";
      html += "</div>";
      return html;
    },
  });
}
  $('[data-toggle=popover]').each( function (item){
    $('[data-toggle=popover]').eq(item).on('shown.bs.popover', function (e) {
      $(this).closest(".row.form-item").find(".fileuploader").removeClass("d-none");
      file_uploader_class=$(this).closest(".row.form-item").find(".fileuploader").data('class');
      $(this).closest(".row.form-item").find(".fileuploader").append($(this).closest(".row.form-item").find(".ajax-file-upload-container"));
      $(".show_uploader." + file_uploader_class).append($(this).closest(".row.form-item").find(" .fileuploader"));
    });
  });

  $('[data-toggle=popover]').on('hide.bs.popover', function (e) {
    //console.log($(this).closest(".row.form-item").find(".fileuploader-content").data('class'));
    $(this).closest(".row.form-item").find(".fileuploader-content").append($(".show_uploader."+ $(this).closest(".row.form-item").find(".fileuploader-content").data('class') +" .fileuploader"));
    $(this).closest(".row.form-item").find(".fileuploader-content .fileuploader").addClass("d-none");
    /*$(this).closest(".row.form-item").find(".fileuploader").appendTo(".fileuploader-content");*/
  });
  $(".delete-invoice").click( function () {
    $(this).closest(".freight-item").remove();
  });
  $("table.table").on("click",".remove",function () {
    $(this).closest("tr").remove();
    calc_total("remove");
  });
  $(document.body).on("click","#"+invoice_number+" .new_product button[type=submit]",function(){
    modallength=$(".modal").length;
    modalclone=' <div class="modal product-modal'+(modallength+1) +' " tabindex="-1" role="dialog"\n' +
      '                                       aria-labelledby="exampleModalLabel" aria-hidden="true">\n' +
      '                                    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">\n' +
      '                                      <div class="modal-content">\n' +
      '                                        <form method="post" action="">\n' +
      '                                          <div class="modal-header">\n' +
      '                                            <h5 class="modal-title">Товар тўғрисида маълумотлар</h5>\n' +
      '                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
      '                                              <span aria-hidden="true">&times;</span>\n' +
      '                                            </button>\n' +
      '                                          </div>\n' +
      '                                          <div class="modal-body">\n' +
      '                                            <div class="col-12 text-left">\n' +
      '                                              <div class="row">\n' +
      '                                                <div class="col-md-4">\n' +
      '                                                  <div class="form-group">\n' +
      '                                                    <label> ТИФТН код </label><input type="text" class="form-control"\n' +
      '                                                                                     placeholder="48190000000">\n' +
      '                                                  </div>\n' +
      '                                                  <!-- /.form-group -->\n' +
      '                                                </div>\n' +
      '                                                <div class="col-md-8">\n' +
      '                                                  <div class="form-group">\n' +
      '                                                    <label> Товар номи </label><input type="text" class="form-control"\n' +
      '                                                                                      placeholder="Яшыки из гофрокартона 5-ти слойние бурые (585х385х190)\t">\n' +
      '                                                  </div>\n' +
      '                                                  <!-- /.form-group -->\n' +
      '                                                </div>\n' +
      '                                                <div class="col-md-2">\n' +
      '                                                  <div class="form-group">\n' +
      '                                                    <label> Миқдори </label><input type="text" class="form-control"\n' +
      '                                                                                   placeholder="8000">\n' +
      '                                                  </div>\n' +
      '                                                  <!-- /.form-group -->\n' +
      '                                                </div>\n' +
      '                                                <div class="col-md-2">\n' +
      '                                                  <div class="form-group">\n' +
      '                                                    <label> Ўлчов бирлиги </label><input type="text"\n' +
      '                                                                                         class="form-control"\n' +
      '                                                                                         placeholder="8000">\n' +
      '                                                  </div>\n' +
      '                                                  <!-- /.form-group -->\n' +
      '                                                </div>\n' +
      '                                                <div class="col-md-4">\n' +
      '                                                  <div class="form-group">\n' +
      '                                                    <label> Фактура қиймати </label>\n' +
      '                                                    <div class="row">\n' +
      '                                                      <div class="col-6"><input type="text" class="form-control"\n' +
      '                                                                                placeholder="8000"></div>\n' +
      '                                                      <div class="col-6">\n' +
      '                                                        <select class="form-control">\n' +
      '                                                          <option>Сўм</option>\n' +
      '                                                          <option>Дол (USD)</option>\n' +
      '                                                          <option>Рубль</option>\n' +
      '                                                        </select>\n' +
      '                                                      </div>\n' +
      '                                                    </div>\n' +
      '                                                  </div>\n' +
      '                                                  <!-- /.form-group -->\n' +
      '                                                </div>\n' +
      '                                                <div class="col-md-2">\n' +
      '                                                  <div class="form-group">\n' +
      '                                                    <label> Брутто вазни </label><input type="text"\n' +
      '                                                                                        class="form-control"\n' +
      '                                                                                        placeholder="5000">\n' +
      '                                                  </div>\n' +
      '                                                  <!-- /.form-group -->\n' +
      '                                                </div>\n' +
      '                                                <!-- /.col -->\n' +
      '                                              </div>\n' +
      '                                            </div>\n' +
      '                                          </div>\n' +
      '                                          <div class="modal-footer">\n' +
      '                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Ёпиш\n' +
      '                                            </button>\n' +
      '                                            <button type="submit" data-dismiss="modal" class="btn btn-primary">Сақлаш</button>\n' +
      '                                          </div>\n' +
      '\n' +
      '                                        </form>\n' +
      '                                      </div>\n' +
      '                                    </div>\n' +
      '                                  </div>';

    $(this).closest(".freight-item",0).find("table tbody:last-child").eq(0).append("<tr><td>1</td><td><i class='fas fa-pencil-alt' data-toggle='modal' data-target='.product-modal"+(modallength+1)+"'></i>"+modalclone+"</td>" +
      "<td>4819100000</td><td>Яшыки из гофрокартона 5-ти слойние бурые (585х385х190)</td> <td>8950</td><td>шт</td><td class='brutto_weight_item'>9100</td><td>8502,50</td><td>Дол(USD)</td>" +
      "<td><span class='remove'><i class='fas fa-plus'></i></span></td></tr>");
    calc_total();
  })

}




  invoice_scripts("invoice-1");


$(".add-invoice-btn").click(function(){
  clonenumber=($('.freight-item').length + 2 );
clone = $(".freight-item.d-none").clone();
clone.find("#custom-tabs-one-home-1").prop('id', 'custom-tabs-one-home-' + clonenumber );
  clone.find("[href='#custom-tabs-one-home-1']").prop('href', '#custom-tabs-one-home-' + clonenumber );
clone.find("#custom-tabs-one-profile-1").prop('id', 'custom-tabs-one-profile-' + clonenumber );
  clone.find("[href='#custom-tabs-one-profile-1']").prop('href', '#custom-tabs-one-profile-' + clonenumber );
  clone.find("#custom-tabs-one-home-tab-receiper-1").prop('id', 'custom-tabs-one-home-tab-receiper-' + clonenumber );
clone.find("[href='#custom-tabs-one-home-tab-receiper-1']").prop('href', '#custom-tabs-one-home-tab-receiper-' + clonenumber );
clone.find("#custom-tabs-one-profile-receiper-1").prop('id', 'custom-tabs-one-profile-receiper-' + clonenumber );
  clone.find("[href='#custom-tabs-one-profile-receiper-1']").prop('href', '#custom-tabs-one-profile-receiper-' + clonenumber );
  clone.removeClass("d-none");
clone.find('h3.card-title').text("Инвойс "+ (clonenumber-2));
clone.find('.list-products .modal.product-modal').removeClass('product-modal').addClass('product-modal' + clonenumber);
clone.find('.list-products .add_product.btn').attr('data-target','.product-modal' + clonenumber);
clone.find('.fileuploader').attr("data-class","fileuploader-" + clonenumber);

clone.find('.fileuploader-content').attr("data-class","fileuploader-" + clonenumber);
clone.find('.list-products tbody tr').remove();
clone.find('.receiper-value').attr('data-target','.receiper-modal' + clonenumber);
clone.find('.receiper-modal.modal').removeClass('receiper-modal').addClass('receiper-modal' + clonenumber);
  clone.find('.sender-value').attr('data-target','.sender-modal' + clonenumber);
  clone.find('.sender-modal.modal').removeClass('sender-modal').addClass('sender-modal' + clonenumber);

content= '<div class="show_uploader fileuploader-'+ clonenumber +'"></div>';
  clone.find('.file_biriktirish').attr("data-content",content);
clone.prop('id',"invoice_id"+clonenumber);
$("section.content.freights").append(clone);
$(".freight-item").each(function (i){
    if($(".freight-item").eq(i).attr('id')!="invoice_id"+clonenumber)
  $(".freight-item").eq(i).find(".card").CardWidget('collapse');
    else $(".freight-item").eq(i).find(".card").CardWidget('expand');
});

  invoice_scripts("invoice_id"+clonenumber);
});
$(".kirish_bojxona_posti").select2();
  $('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
      //the 'is' for buttons that trigger popups
      //the 'has' for icons within a button that triggers a popup
      if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
        $(this).popover('hide');
      }
    });
  });

  var autocomplete2 = $(".transport_davlat_raqami").autocomplete({
    source: [
      {label: "50F355JA", value: "1"},
      {label: "01X197GA", value: "2"},
      {label: "80A003BA", value: "3"},
    ],
    select: function (event, ui) {
      // Set selection
      //$('.dropdown-block.sender input').val(ui.item.label); // display the selected text
     /* $('.dropdown-block.sender input[name=sender]').hide(); // display the selected text
      $('.dropdown-block.sender .selected_sender').removeClass("d-none"); // display the selected text
      $('.dropdown-block.sender .selected_sender').find(".sender-value").text(ui.item.label); // display the selected text*/
      $(this).val( ui.item.label );
      $(".transport_country").val(1);
      $(".transport_type").val(2);
      $(".transport_marka").val("VOLVO FH12420");
      $(".transport_vin").val("NS272WZZ4GJ004178");
      $(".transport_weight").val(7123);

      return false;
    },
    focus: function (event, ui) {
      // somefunctions();


      return false;
    },
    classes: {
      "ui-autocomplete": "transport-select",
    },/*
    response: function (event, ui) {

      var noResult = {value: "no-results", label: "Қўшиш"};
      ui.content.push(noResult);
    },
    create: function (event, ui) {
      $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
        var Listitem;
        if (item.value == "no-results") {
          Listitem = $('<li>').append('<div id="ui-id-" tabindex="-1" class="ui-menu-item-wrapper"  data-toggle="modal" data-target=".sender-modal">' + item.label + '</div>').addClass("add");
        } else
          Listitem = $('<li>').append('<div id="ui-id-" tabindex="-1" class="ui-menu-item-wrapper">' + item.label + '</div>');
        return Listitem.appendTo(ul);
      };
    },*/
    minLength: 0
  }).bind('focus', function () {
    if (!$(this).val().trim())
      $(this).keydown();
  });
  var autocomplete3 = $(".tirkama_davlat_raqami").autocomplete({
    source: [
      {label: "50F355JA", value: "1"},
      {label: "01X197GA", value: "2"},
      {label: "80A003BA", value: "3"},
    ],
    select: function (event, ui) {
      // Set selection
      //$('.dropdown-block.sender input').val(ui.item.label); // display the selected text
     /* $('.dropdown-block.sender input[name=sender]').hide(); // display the selected text
      $('.dropdown-block.sender .selected_sender').removeClass("d-none"); // display the selected text
      $('.dropdown-block.sender .selected_sender').find(".sender-value").text(ui.item.label); // display the selected text*/
      $(this).val( ui.item.label );
      $(".tirkama_ruy_davlat").val(2);
      $(".tirkama_vin").val("NS272WZZ4GJ004178");
      $(".tirkama_weight").val(7123);

      return false;
    },
    focus: function (event, ui) {
      // somefunctions();


      return false;
    },
    classes: {
      "ui-autocomplete": "tirkama-select",
    },/*
    response: function (event, ui) {

      var noResult = {value: "no-results", label: "Қўшиш"};
      ui.content.push(noResult);
    },
    create: function (event, ui) {
      $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
        var Listitem;
        if (item.value == "no-results") {
          Listitem = $('<li>').append('<div id="ui-id-" tabindex="-1" class="ui-menu-item-wrapper"  data-toggle="modal" data-target=".sender-modal">' + item.label + '</div>').addClass("add");
        } else
          Listitem = $('<li>').append('<div id="ui-id-" tabindex="-1" class="ui-menu-item-wrapper">' + item.label + '</div>');
        return Listitem.appendTo(ul);
      };
    },*/
    minLength: 0
  }).bind('focus', function () {
    if (!$(this).val().trim())
      $(this).keydown();
  });
  var autocomplete4 = $(".tashuvchi").autocomplete({
    source: [
      {label: "Sardor Logistic Co.Ltd", value: "1"},
      {label: "FigmaSa Transport Logistic Company", value: "2"},
      {label: "VarKa Logistic Co.Ltd ", value: "3"},
    ],
    select: function (event, ui) {
      // Set selection
      //$('.dropdown-block.sender input').val(ui.item.label); // display the selected text
     /* $('.dropdown-block.sender input[name=sender]').hide(); // display the selected text
      $('.dropdown-block.sender .selected_sender').removeClass("d-none"); // display the selected text
      $('.dropdown-block.sender .selected_sender').find(".sender-value").text(ui.item.label); // display the selected text*/
      $(this).val( ui.item.label );
      $(".tashuvchi_davlati").val(2);
      $(".tashuvchi_stiri").val("651686846");
      $(".kirish_bojxona_posti").val(2);

      return false;
    },
    focus: function (event, ui) {
      // somefunctions();


      return false;
    },
    classes: {
      "ui-autocomplete": "tirkama-select",
    },/*
    response: function (event, ui) {

      var noResult = {value: "no-results", label: "Қўшиш"};
      ui.content.push(noResult);
    },
    create: function (event, ui) {
      $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
        var Listitem;
        if (item.value == "no-results") {
          Listitem = $('<li>').append('<div id="ui-id-" tabindex="-1" class="ui-menu-item-wrapper"  data-toggle="modal" data-target=".sender-modal">' + item.label + '</div>').addClass("add");
        } else
          Listitem = $('<li>').append('<div id="ui-id-" tabindex="-1" class="ui-menu-item-wrapper">' + item.label + '</div>');
        return Listitem.appendTo(ul);
      };
    },*/
    minLength: 0
  }).bind('focus', function () {
    if (!$(this).val().trim())
      $(this).keydown();
  });

  $(".transport_country").select2();
  $(".tashuvchi_davlati").select2();
  $(".transport_type").select2();

  $(".no-required input").hide();
  $(".no-required").append("<span>"+$(".no-required").data('text')+"</span>");
$(".no-required").click(function(){
  $(this).find("input").show();
  $(this).find("span").remove();
  $(this).removeClass('no-required');
})

  function calc_total(){

    $(".freight-item .list-products table.table tbody").each(function(){
      var sum = 0;
      $(this).find("tr").each(function(){
        sum += parseFloat($(this).find("td").eq(6).text());
      });
      $(this).closest('.freight-item').find('.brutto_weight').text(sum);

    });

  }
  calc_total();
  $('.col-12.tashuvchi_type').change(function() {
    $('#console-event').html('Toggle: ' + $(this).prop('checked'))
  })

});




