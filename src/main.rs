// -*-coding: utf-8 -*-
/***********************************************
@file    :   main.rs
@time    :   2023/12/01 19:39:33
@author  :   ***cw***
@version :   1.0
@desc    :   None
***********************************************/


use std::{fs, usize};

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
fn converte_keys(data: String) -> String {


    let mut my_data = String::new();
    let key_words: Vec<String> = vec![
        String::from("one"),
        String::from("two"),
        String::from("three"),
        String::from("four"),
        String::from("five"),
        String::from("six"),
        String::from("seven"),
        String::from("eight"),
        String::from("nine"),
    ];

    for line in data.lines() {

        let mut my_line = line.to_string();

        let mut key_pos: Vec<usize> = Vec::new();
        let mut key_found: Vec<String> = Vec::new();

            for key in key_words.clone().into_iter(){
                let pos: Option<usize> = my_line.find(key.as_str());
                match pos{
                    Some(x) =>{
                        key_pos.push(x);
                        key_found.push(key);
                    },
                    None => {},
                }
                
            }
            while key_pos.len() > 0{
                let min_val = *key_pos.iter().min().unwrap();
                let min_pos = key_pos.iter().position(|&x| x == min_val).unwrap();

                let use_key = key_found[min_pos].clone();
                key_pos.remove(min_pos);
                key_found.remove(min_pos);
                for (j,key) in key_words.clone().into_iter().enumerate(){
                    if key.eq(&use_key){
                        let rep_str = key.clone() + (j+1).to_string().as_str()  + &key.clone();
                        my_line = my_line.replace(key.as_str(), rep_str.as_str());
                    }
                }

            }
            my_data = my_data + &my_line + "\n";
    }
    return my_data;

}



fn main() {
    let path: String = String::from("./data.txt");

    let mut data: String = read_file(path);
    data = converte_keys(data);

    let value_line: Vec<u32> = parse_line(data);


    let sum: u32 = value_line.iter().sum();

    println!("{sum}");
}
