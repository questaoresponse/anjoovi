<?php
if (!session()->has("key_admin") || !descrip2(session("key_admin"))){
    return redirect("/dev");
};