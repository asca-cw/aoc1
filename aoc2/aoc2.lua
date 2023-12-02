
local function readAll(data)
    local handle = assert(io.open(data, "r"))
    local data = handle:read("*all")
    handle:close()

    local lines = {}
    for line in data:gmatch("[^\r\n]+") do
        table.insert(lines, line)
    end

    return lines
end

local function split_key(data, key)
    local ret_data = {}
    local function helper(line)
       table.insert(ret_data, line)
       return ""
    end
    helper((data:gsub("(.-)("..key..")", helper)))
    return ret_data
 end

local function split_line (data)
    data = split_key(data, ": ")[2]
    data = split_key(data, "; ")
    
    local picks  = {}
    for i=1, #data do
        table.insert(picks, split_key(data[i], ", "))
    end 
    return picks
    
end

local function check_line (data, color_keys, color)
    for i=1, #data do
        for j=1, #data[i] do
            for k, key in ipairs(color_keys) do
                if data[i][j]:find(key) then
                    local nr = tonumber(data[i][j]:match("%d+"))
                    if nr > tonumber(color[key]) then
                        return nil
                    end
                end
            end
        end
    end
    return true
end

local function check_line_2(data, color_keys)
    local max = {}
    for k, key in ipairs(color_keys) do
        max[key] = 0
    end
    for i=1, #data do
        for j=1, #data[i] do
            for k, key in ipairs(color_keys) do
                if data[i][j]:find(key) then
                    local nr = tonumber(data[i][j]:match("%d+"))
                    if nr > max[key] then
                        max[key] = nr
                    end
                end
            end
        end
    end
    
    return max["red"] * max["green"] * max["blue"] 
end

local filename = "./data.txt"
local color_keys = {"red", "green", "blue"}
local color = {}
color["red"] = 12
color["green"] = 13
color["blue"] = 14

local data = readAll(filename)

local sum = 0
local sum_2 = 0

for i=1, #data do
    data[i] = split_line(data[i])
    sum_2 = check_line_2(data[i], color_keys) + sum_2
    if check_line(data[i], color_keys, color) then
        sum = sum + i
    end
end 

print(sum)
print(sum_2)

