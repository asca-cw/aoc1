// -*-coding: utf-8 -*-
/***********************************************
@file    :   main.rs
@time    :   2023/12/01 19:39:33
@author  :   ***cw***
@version :   1.0
@desc    :   None
***********************************************/


use std::fs;

fn read_file(path: String) -> String{

    let data:String = fs::read_to_string(path)
        .expect("check path idiot");

    return data;
}

fn parse_line(data: String)->Vec<u32> {

    let mut data_vec: Vec<u32> = Vec::new();

    for line in data.lines() {
        let mut tmp: String = String::new();
        for c in line.chars(){
            if c.is_numeric(){
                tmp.push(c);
                break;
            }
        }
        for c in line.chars().rev(){
            if c.is_numeric(){
                tmp.push(c);
                break;
            }
        }
        data_vec.push(tmp.parse::<u32>().unwrap())
    }
    return data_vec;

}


fn main() {
    let path: String = String::from("./data.txt");

    let data: String = read_file(path);
    let value_line: Vec<u32> = parse_line(data);

    let sum: u32 = value_line.iter().sum();

    println!("{sum}");
}
