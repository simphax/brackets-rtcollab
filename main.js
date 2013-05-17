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
        _currentView            = "realtime",
        RTCC_VIEW_REALTIME_EXT  = "simphax.rtcc.view_realtime",
        RTCC_VIEW_LOCAL_EXT     = "simphax.rtcc.view_local";

    function _init() {
        if(_currentView == "realtime") {
            _setRealtimeView();
        } else {
            _setLocalView();
        }
    }

    function _initHTML() {
        /*var e = $("<h1>hej</h1>");
        $(".project-settings-dialog .modal-body").append("<h1>hej</h1>");
        */
        if(_currentView == "realtime") {
            var editor = EditorManager.getCurrentFullEditor();
            console.debug(editor);
        } else {
            
        }
    }

    function _setRealtimeView() {
        _currentView = "realtime";
        CommandManager.get(RTCC_VIEW_REALTIME_EXT).setChecked(true);
        CommandManager.get(RTCC_VIEW_LOCAL_EXT).setChecked(false);
        //Dialogs.showModalDialog("rtccmodal","Dialog",ProjectManager.getProjectRoot());
        //window.alert(ProjectManager.getProjectRoot());
    }

    function _setLocalView() {
        _currentView = "local";
        CommandManager.get(RTCC_VIEW_REALTIME_EXT).setChecked(false);
        CommandManager.get(RTCC_VIEW_LOCAL_EXT).setChecked(true);
    }

    function _handleDocumentChange(event, document, changeList) {
        //var editor = document._masterEditor;
        console.debug("Document change");
        console.debug(changeList);
        //console.debug(editor);
    }
    
    function _registerHandlers(editor, fileType) {
        console.debug("register handlers");
        var cm = editor._codeMirror, doc = editor.document;
        if (cm) {
            $(doc).on("change", _handleDocumentChange);
        }
    }
    
    function _deregisterHandlers(editor) {
        $(editor.document).off("change", _handleDocumentChange);
    }

    $(EditorManager).on("activeEditorChange", function (event, current, previous) {
        if (previous) {
            _deregisterHandlers(previous);
        }
        if (current) {
            _registerHandlers(current);
        }
    });

    AppInit.appReady(_init);
    AppInit.htmlReady(_initHTML);

    //Load stylesheet
    ExtensionUtils.loadStyleSheet(module, "main.less");

    Menus.getMenu(Menus.AppMenuBar.FILE_MENU).addMenuDivider();

    CommandManager.register("Show Collab View",RTCC_VIEW_REALTIME_EXT,_setRealtimeView);
    Menus.getMenu(Menus.AppMenuBar.FILE_MENU).addMenuItem(RTCC_VIEW_REALTIME_EXT);

    CommandManager.register("Show Local View",RTCC_VIEW_LOCAL_EXT,_setLocalView);
    Menus.getMenu(Menus.AppMenuBar.FILE_MENU).addMenuItem(RTCC_VIEW_LOCAL_EXT);
    
});