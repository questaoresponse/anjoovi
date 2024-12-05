<?php
if (!session()->has("key") || !descrip2(session("key"))){
    return redirect("/admin");
}
?>