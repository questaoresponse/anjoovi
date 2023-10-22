<?php
if (session()->has("key") || !descrip(session("key"),$c)){
    return redirect("/admin");
}
?>