/*
* Copyright (c) 2013 Simon Nilsson. All rights reserved.
*
* Permission is hereby granted, free of charge, to any person obtaining a
* copy of this software and associated documentation files (the "Software"),
* to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense,
* and/or sell copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
*
*/
/**
 * real time cloud collab
 * @author Simon Nilsson
 * @date 4/29/13 11:15:10 PM
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, document, require, $, brackets, window, MouseEvent, CodeMirror */

define(function (require, exports, module) {
    "use strict";
    var CommandManager          = brackets.getModule("command/CommandManager"),
        ProjectManager          = brackets.getModule("project/ProjectManager"),
        DocumentManager         = brackets.getModule("document/DocumentManager"),
        EditorManager           = brackets.getModule("editor/EditorManager"),
        Menus                   = brackets.getModule("command/Menus"),
        KeyEvent                = brackets.getModule("utils/KeyEvent"),
        ExtensionUtils          = brackets.getModule("utils/ExtensionUtils"),
        AppInit                 = brackets.getModule("utils/AppInit"),
        Dialogs                 = brackets.getModule("widgets/Dialogs"),
        _projectCollabEnabled   = false,
        RTCC_ENABLE_EXT         = "simphax.rtcc.enable";

    function _init() {
    }

    function _initHTML() {
        /*var e = $("<h1>hej</h1>");
        $(".project-settings-dialog .modal-body").append("<h1>hej</h1>");
        */
    }

    function _enableRtccOnProject() {
        _projectCollabEnabled = !_projectCollabEnabled;
        CommandManager.get(RTCC_ENABLE_EXT).setChecked(_projectCollabEnabled);
        //Dialogs.showModalDialog("rtccmodal","Dialog",ProjectManager.getProjectRoot());
        window.alert(ProjectManager.getProjectRoot());
    }

    AppInit.appReady(_init);
    AppInit.htmlReady(_initHTML);


    //Load stylesheet
    ExtensionUtils.loadStyleSheet(module, "main.less");

    CommandManager.register("Enable Realtime Collab",RTCC_ENABLE_EXT,_enableRtccOnProject)
    Menus.getMenu(Menus.AppMenuBar.FILE_MENU).addMenuDivider();
    Menus.getMenu(Menus.AppMenuBar.FILE_MENU).addMenuItem(RTCC_ENABLE_EXT);
    
});