/*!
 * ${copyright}
 */
sap.ui.define(['jquery.sap.global', 'sap/ui/core/Renderer', 'sap/m/SelectListRenderer', 'sap/m/TabStripSelectList', 'sap/m/TabStripItem'],
	function(jQuery, Renderer, SelectListRenderer, TabStripSelectList, TabStripItem) {
		"use strict";

		/**
		 * TabStripSelectListRenderer renderer.
		 *
		 * @namespace
		 */
		var TabStripSelectListRenderer = Renderer.extend(SelectListRenderer);

		/**
		 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
		 *
		 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
		 * @param {sap.ui.core.Control} oList An object representation of the control that should be rendered.
		 * @param {sap.ui.core.Element} oItem An object representation of the element that should be rendered.
		 * @param {object} mStates
		 */
		TabStripSelectListRenderer.renderItem = function(oRm, oList, oItem, mStates) {
			if (!(oItem instanceof sap.ui.core.Element)) {
				return;
			}
			var bEnabled                = oItem.getEnabled(),
				oSelectedItem           = oList.getSelectedItem(),
				CSS_CLASS               = SelectListRenderer.CSS_CLASS,
				sTooltip                = oItem.getTooltip_AsString(),
				sStateClass             = ' ',
				oCloseButton;

			oCloseButton = oItem.getAggregation('_closeButton');
			if (sap.ui.Device.system.desktop) {
				oCloseButton.addStyleClass(TabStripSelectList.CSS_CLASS_CLOSEBUTTONINVISIBLE);
			}

			oRm.write("<li");
			oRm.writeElementData(oItem);
			if (oItem instanceof sap.ui.core.SeparatorItem) {
				oRm.addClass(CSS_CLASS + "SeparatorItem");
			} else {
				oRm.addClass(CSS_CLASS + "ItemBase");

				oRm.addClass(CSS_CLASS + "Item");

				if (oItem.bVisible === false) {
					oRm.addClass(CSS_CLASS + "ItemBaseInvisible");
				}
				if (!bEnabled) {
					oRm.addClass(CSS_CLASS + "ItemBaseDisabled");
				}
				if (bEnabled) {
					oRm.writeAttribute("tabindex", "0");
				}
				if (bEnabled && sap.ui.Device.system.desktop) {
					oRm.addClass(CSS_CLASS + "ItemBaseHoverable");
				}
				if (oItem === oSelectedItem) {
					oRm.addClass(CSS_CLASS + "ItemBaseSelected");
					oItem.getAggregation('_closeButton').removeStyleClass(TabStripSelectList.CSS_CLASS_CLOSEBUTTONINVISIBLE);
				}
			}
			oRm.writeClasses();
			if (sTooltip) {
				oRm.writeAttributeEscaped("title", sTooltip);
			}
			this.writeItemAccessibilityState.apply(this, arguments);
			oRm.write(">");

			oRm.write('<p');
			oRm.writeAttribute('class', 'sapMSelectListItemText');
			oRm.write('>');
			oRm.writeEscaped(oItem.getText().slice(0, TabStripItem.DISPLAY_TEXT_MAX_LENGHT));
			if (oItem.getText().length > TabStripItem.DISPLAY_TEXT_MAX_LENGHT) {
				oRm.write('...');
			}
			oRm.write('</p>');



			if (!oItem.getProperty('modified')) {
				sStateClass += TabStripItem.CSS_CLASS_STATEINVISIBLE; // ToDo: fix the name of the variable
			}

			oRm.write("<p class=\"sapMTabSelectListItemModified" + sStateClass + "\">*</p>");

			oRm.renderControl(oCloseButton);

			oRm.write("</li>");
		};

		return TabStripSelectListRenderer;

	}, /* bExport= */ true);